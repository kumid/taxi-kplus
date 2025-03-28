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
    console.log('createCarDto:', createCarDto);
    const car = await this.db
      .insert(cars)
      .values(createCarDto)
      .returning({ id: cars.id });
    return car[0];
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

    const query = `
        SELECT 
      cars.id, 
      cars.model, 
      cars.ctc, 
      cars.year, 
      cars.organization, 
      cars.summa_buy, 
      cars.summa_sell, 
      cars.status, 
      cars.buy_price, 
      cars.buy_terms, 
      cars.payment_day, 
      cars."customerName", 
      cars."customerPhone", 
      cars."customerAddress", 
      cars."customerPassport", 
      cars.payment,
  
      (
          SELECT numbers.gov_number
          FROM numbers
          WHERE numbers."carId" = cars.id
          ORDER BY numbers.id DESC
          LIMIT 1
      ) AS latestNumber,
  
      COALESCE(
          jsonb_agg(
              jsonb_build_object(
                  'id', payments.id,
                  'type', payments.type,
                  'date', payments.date,
                  'sum', payments.sum
              ) ORDER BY payments.date ASC
          ) FILTER (WHERE payments.id IS NOT NULL), '[]'::jsonb
      ) AS payments

  FROM public.cars
  LEFT JOIN public.payments ON payments."carId" = cars.id
  GROUP BY cars.id
  ORDER BY cars.id 
      LIMIT ${limit} OFFSET ${offset};
    `;

    const data = await this.db.execute(query);

    return data.rows; // Returning rows since `execute` typically returns the result in `rows`.
  }
}
