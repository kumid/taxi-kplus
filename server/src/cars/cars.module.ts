
import { Module } from '@nestjs/common'; 
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { CarController } from './cars.controller';
import { CarService } from './cars.service';
import { NumbersService } from 'src/numbers/numbers.service';

@Module({
  controllers: [CarController],
  providers: [CarService, NumbersService],
    imports: [DrizzleModule],
})
export class CarModule {}