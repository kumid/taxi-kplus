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
        id: cars.id,
        model: cars.model,
        ctc: cars.ctc,
        year: cars.year,
        organization: cars.organization,
        summa_buy: cars.summa_buy, // bought
        summa_sell: cars.summa_sell, // price
        status: cars.status, // статус машины (bought-куплена, installment - в рассрочке, sold - выплачена)

        buy_price: cars.buy_price, // price in market
        buy_terms: cars.buy_terms, // terms
        payment_day: cars.payment_day,

        customerName: cars.customerName, // имя покупателя
        customerPhone: cars.customerPhone, // телефон покупателя
        customerAddress: cars.customerAddress, // адрес покупателя
        customerPassport: cars.customerPassport, // паспорт покупателя,
        latestNumber: numbers.gov_number,
      })
      .from(cars)
      .leftJoin(
        numbers,
        sql`${numbers.id} = (
          SELECT id FROM ${numbers}
          WHERE ${numbers.carId} = ${cars.id}
          ORDER BY ${numbers.id} DESC
          LIMIT 1
        )`,
      )
      .orderBy(cars.id) // Ensures consistent ordering
      .limit(limit)
      .offset(offset);

    return data;
  }
}
