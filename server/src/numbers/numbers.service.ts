import { Inject, Injectable } from '@nestjs/common';
import { CreateNumberDto } from './dto/create-number.dto';
import { UpdateNumberDto } from './dto/update-number.dto';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { numbers } from 'src/drizzle/schema/numbers.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class NumbersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  
  async create(createNumberDto: CreateNumberDto) {
    return await this.db.insert(numbers).values(createNumberDto); 
  }

  async findAll() {
    return await this.db.query.numbers.findMany({
      orderBy: (number, { asc }) => [asc(number.id)],
    });
  }

  async findOne(id: number) {
    const number = await this.db.query.numbers.findFirst({
      where: (number, { eq }) => eq(number.id, id),
    });
    return number;
  }
  async findLastNumber(carId: number) {
    const number = await this.db.query.numbers.findFirst({
      where: (number, { eq }) => eq(number.carId, carId),
      orderBy: (number, { desc }) => [desc(number.id)],
    });
    return number;
  }

  async update(id: number, updateNumberDto: UpdateNumberDto) {
     return await this.db.update(numbers).set(updateNumberDto).where(eq(numbers.id, id));
  }

  async remove(id: number) {
    return await this.db.delete(numbers).where(eq(numbers.id, id));
  }
}
