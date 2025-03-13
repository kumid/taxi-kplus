import { Inject } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { cars } from 'src/drizzle/schema/cars.schema';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { numbers } from 'src/drizzle/schema/numbers.schema';
import { payments } from 'src/drizzle/schema/payments.schema';

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
        summa_buy: cars.summa_buy, // цена покупки
        summa_sell: cars.summa_sell, // цена продажи
        status: cars.status, // статус машины (bought-куплена, installment - в рассрочке, sold - выплачена)

        buy_price: cars.buy_price, // price in market
        buy_terms: cars.buy_terms, // terms
        payment_day: cars.payment_day,
        payment: cars.payment,

        customerName: cars.customerName, // имя покупателя
        customerPhone: cars.customerPhone, // телефон покупателя
        customerAddress: cars.customerAddress, // адрес покупателя
        customerPassport: cars.customerPassport, // паспорт покупателя,
        numbers: sql`COALESCE(json_agg(
          json_build_object(
                'gov_number', ${numbers.gov_number}, 
                'comment', ${numbers.comment}
              ) 
              ORDER BY ${numbers.id}
          ), '[]')`.as('numbers'),
        payments: sql`COALESCE(json_agg(
          json_build_object(
                'date', ${payments.date}, 
                'comment', ${payments.type}, 
                'sum', ${payments.sum}
              ) 
              ORDER BY ${payments.id}
          ), '[]')`.as('payments'),
         
        // latestNumber:  numbers.gov_number,
      })
      .from(cars)
      // .leftJoin(
      //   numbers,
      //   sql`${numbers.id} = (
      //     SELECT id FROM ${numbers}
      //     WHERE ${numbers.carId} = ${cars.id}
      //     ORDER BY ${numbers.id} DESC
      //     LIMIT 1
      //   )`,
      // )
      // .leftJoin(
      //   numbers,
      //   sql`${numbers.id} = (
      //     SELECT id FROM ${numbers}
      //     WHERE ${numbers.carId} = ${cars.id}
      //     ORDER BY ${numbers.id} DESC
      //     LIMIT 1
      //   )`,
      // )
      .leftJoin(numbers, eq(numbers.carId, cars.id))
      .leftJoin(payments, eq(payments.carId, cars.id))
      .groupBy(cars.id) // Ensures grouping by car ID
      .orderBy(cars.id) // Ensures predictable pagination
      .limit(limit)
      .offset(offset);
 
    return data;
  }
}
