import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'; 
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarService } from './cars.service';

@Controller('api/v1/cars')
export class CarController {
  constructor(private readonly carService: CarService) { }

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }


  @Get()
  findAll() {
    return this.carService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCarDto) {
    return this.carService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
