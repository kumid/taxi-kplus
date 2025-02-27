 
import { date, doublePrecision, index, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { cars } from "./cars.schema";

export const numbers = pgTable(
  'numbers',
  {
    id: serial('id').primaryKey(), 
    date: date('date'),
    gov_number: text('gov_number').default('').notNull(),
    comment: text('comment'),
    carId: integer().references(() => cars.id)
  },
);