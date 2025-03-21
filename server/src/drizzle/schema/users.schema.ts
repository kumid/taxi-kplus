 
import { boolean, date, doublePrecision, index, integer, pgTable, serial, text } from "drizzle-orm/pg-core"; 

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    token: text('password'),
    status: boolean('status').default(false).notNull(),
    created_at: date('created_at').defaultNow().notNull(),
    updated_at: date('updated_at').defaultNow().notNull(),
  },
);