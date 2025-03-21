 
import { date, doublePrecision, index, integer, pgTable, serial, text } from "drizzle-orm/pg-core"; 

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name'),
    email: text('email'),
    password: text('password'),
    token: text('password'),
  },
);