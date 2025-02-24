import { CreateLoanDto } from './dto/create-loan.dto'; 
import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { eq } from 'drizzle-orm';
import { loans } from 'src/drizzle/schema/loans.schema';
import { decryptString } from 'src/services/criptographV2'; 

@Injectable()
export class LoanService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) { }
  async create(createLoanDto: CreateLoanDto) {
    return await this.db
      .insert(loans)
      .values(createLoanDto)
  }

  async findAll() {
    const lst = await this.db.query.loans.findMany({
      orderBy: (loan, { asc }) => [asc(loan.id)],
    }); 
    return lst;
  }
  
  async findAllAdmin() {
    const lst = await this.db.query.loans.findMany({
      orderBy: (loan, { asc }) => [asc(loan.id)],
    });

    for (let i = 0; i < lst.length; i++) {
      const element = lst[i];
      try {
        element.site = await decryptString(element.site);
      } catch (error) {
        console.log(error);
      }
    }
 
    return lst;
  }

  async findOne(id: number) {
    const loans = await this.db.query.loans.findFirst({
      where: (loans, { eq }) => eq(loans.id, id),
    }); 
    return loans;
  }

  async findOneAdmin(id: number) {
    const loans = await this.db.query.loans.findFirst({
      where: (loans, { eq }) => eq(loans.id, id),
    });
    loans.site = await decryptString(loans.site);
    return loans;
  }

  async update(id: number, updateLoanDto: any) {
    updateLoanDto.site = await decryptString(updateLoanDto.site);
    return await this.db
      .update(loans)
      .set(updateLoanDto)
      .where(eq(loans.id, id));
  }

  async remove(id: number) {
    return await this.db.delete(loans).where(eq(loans.id, id));
  }
}