import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarService } from './cars.service';
import { log } from 'console';
import { NumbersService } from 'src/numbers/numbers.service';

@Controller('api/v1/cars')
export class CarController {
  constructor(private readonly carService: CarService,
    private readonly numberService: NumbersService
  ) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    try {
      const car = await this.carService.create(createCarDto);
      console.log('created Car', car);
      await this.numberService.create({
        date: new Date(),
        gov_number: createCarDto.latestNumber,
        carId: car.id});
      return { message: 'Car created successfully' };
    } catch (error) {
      console.error('Error creating car:', error);

      // Throw an HTTP exception with a status code
      throw new HttpException(
        { error: 'Failed to create car' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.carService.getCars(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCarDto) {
    try {
      await this.carService.update(+id, updateCardDto);
      
      if (updateCardDto.latestNumber) {
        const car = await this.numberService.findLastNumber(+id);
        console.log(car);
        
        if (!car || !car.gov_number || car.gov_number !== updateCardDto.latestNumber) {
          await this.numberService.create({
            date: new Date(),
            gov_number: updateCardDto.latestNumber,
            carId: +id});
        }
      }

      return { message: 'Car updated successfully' };
    } catch (error) {
      console.error('Error creating car:', error);

      // Throw an HTTP exception with a status code
      throw new HttpException(
        { error: 'Failed to create car' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }


  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
