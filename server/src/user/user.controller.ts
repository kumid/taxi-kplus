import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SigninUserDto } from './dto/sign-user.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('CreateUserDto:', createUserDto);
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      console.log('error:', error);
      // Throw an HTTP exception with a status code
      throw new HttpException(
        { error: 'Failed to create user' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('signin')
  signin(@Body() signinUserDto: SigninUserDto) {
    console.log('signinUserDto:', signinUserDto);
    return this.usersService.signin(signinUserDto);
  }
}
