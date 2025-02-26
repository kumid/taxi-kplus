 
import { date, doublePrecision, index, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { cars } from "./cars.schema";

export const payments = pgTable(
  'payments',
  {
    id: serial('id').primaryKey(),
    type: text('type').default('').notNull(), 
    date: date('date').default('').notNull(),
    sum: doublePrecision('sum').default(0.0).notNull(),
    carId: integer().references(() => cars.id)
  },
);