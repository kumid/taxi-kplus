import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('api/v1/cards')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Get('admin')
  findAllAdmin() { 
    return this.cardService.findAllAdmin();
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get('admin/:id')
  findOneAdmin(@Param('id') id: string) {
    return this.cardService.findOneAdmin(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }




  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
