import { Inject } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { cars } from 'src/drizzle/schema/cars.schema';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { numbers } from 'src/drizzle/schema/numbers.schema';

export class CarService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createCarDto: CreateCarDto) {
    return await this.db.insert(cars).values(createCarDto);
  }

  async findAll() {
    return await this.db.query.cars.findMany({
      orderBy: (card, { asc }) => [asc(card.id)],
    });
  }

  async findOne(id: number) {
    const card = await this.db.query.cars.findFirst({
      where: (cars, { eq }) => eq(cars.id, id),
    });
    return card;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    return await this.db.update(cars).set(updateCarDto).where(eq(cars.id, id));
  }

  async remove(id: number) {
    return await this.db.delete(cars).where(eq(cars.id, id));
  }

  async getCars(page: number, limit: number) { 
    const offset = (page - 1) * limit;

    const data = await this.db
      .select({
        car: cars,
        latestNumber: numbers.gov_number,
      })
      .from(cars)
      .leftJoin(numbers, eq(numbers.carId, cars.id))
      .where(
        sql`${numbers.id} = (
          SELECT id FROM ${numbers}
          WHERE ${numbers.carId} = ${cars.id}
          ORDER BY ${numbers.id} DESC
          LIMIT 1
        )`,
      )
      .limit(limit)
      .offset(offset);

    return data;
    // return [{ page, limit }];
  }
}
