import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module'; 
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { payments } from 'src/drizzle/schema/payments.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PaymentsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  
  async create(createPaymentDto: CreatePaymentDto) {
    return await this.db.insert(payments).values(createPaymentDto); 
  }

  async findAll() {
    return await this.db.query.payments.findMany({
      orderBy: (payment, { asc }) => [asc(payment.id)],
    });
  }

  async findOne(id: number) {
    const payment = await this.db.query.payments.findFirst({
      where: (payment, { eq }) => eq(payment.id, id),
    });
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return await this.db.update(payments).set(updatePaymentDto).where(eq(payments.id, id));
  }

  async remove(id: number) {
     return await this.db.delete(payments).where(eq(payments.id, id));
  }
}
