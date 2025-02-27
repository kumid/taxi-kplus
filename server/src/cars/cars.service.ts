import { Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DRIZZLE } from "src/drizzle/drizzle.module";
import { cars } from "src/drizzle/schema/cars.schema";
import { DrizzleDB } from "src/drizzle/types/drizzle";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";

export class CarService {
    constructor(@Inject(DRIZZLE) private db: DrizzleDB) { }
    
 async create(createCarDto: CreateCarDto) {
    return await this.db
      .insert(cars)
      .values(createCarDto)
  }

  async findAll() {
    return await this.db.query.cars.findMany({
        orderBy: (card, { asc }) => [asc(card.id)],
    });
}

  async findOne(id: number) {
    const card = await this.db.query.cars.findFirst({
      where: (cars, { eq }) => eq(cars.id, id),
    });
    return card;
  }


    async update(id: number, updateCarDto: UpdateCarDto) {
      return await this.db
        .update(cars)
        .set(updateCarDto)
        .where(eq(cars.id, id));
    }
  
    async remove(id: number) {
      return await this.db.delete(cars).where(eq(cars.id, id));
    }
}
