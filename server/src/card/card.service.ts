import { CreateCardDto } from './dto/create-card.dto';
import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { eq } from 'drizzle-orm';
import { cards } from 'src/drizzle/schema/cards.schema';
import { decryptString, encryptString } from 'src/services/criptographV2';

@Injectable()
export class CardService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) { }
  async create(createCardDto: CreateCardDto) {
    return await this.db
      .insert(cards)
      .values(createCardDto)
  }

  async findAll() {
    const lst = await this.db.query.cards.findMany({
      orderBy: (card, { asc }) => [asc(card.id)],
    });
    return lst;
  }

  async findAllAdmin() {
    const lst = await this.db.query.cards.findMany({
      orderBy: (card, { asc }) => [asc(card.id)],
    });

    for (let i = 0; i < lst.length; i++) {
      const element = lst[i];
      try {
        element.site = await decryptString(element.site);
      } catch (error) {
        console.log(error);
      }
    }

    return lst;
  }

  async findOne(id: number) {
    const card = await this.db.query.cards.findFirst({
      where: (cards, { eq }) => eq(cards.id, id),
    });
    return card;
  }
  
  async findOneAdmin(id: number) {
    const card = await this.db.query.cards.findFirst({
      where: (cards, { eq }) => eq(cards.id, id),
    });
    card.site = await decryptString(card.site);
    return card;
  }

  async update(id: number, updateCardDto: any) {
    updateCardDto.site = await encryptString(updateCardDto.site);
    return await this.db
      .update(cards)
      .set(updateCardDto)
      .where(eq(cards.id, id));
  }

  async remove(id: number) {
    return await this.db.delete(cards).where(eq(cards.id, id));
  }
}