import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
      imports: [DrizzleModule],
})
export class PaymentsModule {}
