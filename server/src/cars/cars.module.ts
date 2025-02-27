
import { Module } from '@nestjs/common'; 
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { CarController } from './cars.controller';
import { CarService } from './cars.service';

@Module({
  controllers: [CarController],
  providers: [CarService],
    imports: [DrizzleModule],
})
export class CarModule {}