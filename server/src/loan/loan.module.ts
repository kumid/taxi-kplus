import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [LoanController],
  providers: [LoanService],
    imports: [DrizzleModule],
})
export class LoanModule {}
