import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module'; 
import { ConfigModule } from '@nestjs/config';
import { CardModule } from './card/card.module';
import { LoanModule } from './loan/loan.module';


@Module({
  imports: [
    DrizzleModule,
    CardModule, 
    LoanModule, 
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
