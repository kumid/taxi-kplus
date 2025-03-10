import { Module } from '@nestjs/common';
import { NumbersService } from './numbers.service';
import { NumbersController } from './numbers.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [NumbersController],
  providers: [NumbersService],
      imports: [DrizzleModule],

})
export class NumbersModule {}
