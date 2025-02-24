import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [CardController],
  providers: [CardService],
    imports: [DrizzleModule],
})
export class CardModule {}
