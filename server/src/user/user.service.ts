import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'; 
import { DRIZZLE } from 'src/drizzle/drizzle.module'; 
import { DrizzleDB } from 'src/drizzle/types/drizzle'; 
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './dto/create-user.dto';
import { users } from 'src/samples/users.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { SigninUserDto } from './dto/sign-user.dto'; 
import { log } from 'console';
import * as bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken'); // Import the library
import 'dotenv/config';

@Injectable()
export class UserService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  
  async create(createUserDto: CreateUserDto) {
    console.log("1");
    try {
        const hash = await bcrypt.hash(createUserDto.password, 8);
        console.log("2");
        createUserDto.password = hash
        createUserDto.email = createUserDto.email.toLowerCase();
        createUserDto.token = "";
        createUserDto.status = true; 
    
        return await this.db.insert(users).values(createUserDto);         
    } catch (error) {
        console.log("error", error);
        return "error123"
    }
  }

  async findAll() {
    return await this.db.query.users.findMany({
      orderBy: (user, { asc }) => [asc(user.id)],
    });
  }

  async findOne(id: number) {
    const user  = await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.db.update(users).set(updateUserDto).where(eq(users.id, id));
  }

  async remove(id: number) {
     return await this.db.delete(users).where(eq(users.id, id));
  }


  async signin(signinUserDto: SigninUserDto) {
    console.log("signinUserDto", signinUserDto);  

    const user = await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, signinUserDto.email),
    });
    console.log("user", user);


    if (user) {
      const isMatch = await bcrypt.compare(signinUserDto.password, user.password);
      console.log("isMatch", isMatch);
      if (isMatch) {

        const token = generateToken(user.id);
        console.log("token", token);

        return {
            name: user.name,
            token: token
        };
      } 
    }

    throw new HttpException(
            { error: 'Failed to signin' },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
  }
 
}
function generateToken(userId: number) {
    console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);  
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log("token", token);
    return token;
}

