import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('api/v1/loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto);
  }

  @Get('admin')
  findAllAdmin() {
    return this.loanService.findAllAdmin();
  }

  @Get()
  findAll() {
    return this.loanService.findAll();
  }

  @Get('admin/:id')
  findOneAdmin(@Param('id') id: string) {
    return this.loanService.findOneAdmin(+id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loanService.update(+id, updateLoanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loanService.remove(+id);
  }
}
