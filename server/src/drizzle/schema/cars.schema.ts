 
import { doublePrecision, index, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

/// Данные покупателя
export const cars = pgTable(
  'cars',
  {
    id: serial('id').primaryKey(),
    model: text('model').default('').notNull(),
    ctc: text('ctc').default('').notNull(), 
    year: integer('year').default(2025).notNull(),
    organization: text('organization').default('').notNull(), 
    summa_buy: doublePrecision('summa_buy').default(0.0).notNull(),    // bought
    summa_sell: doublePrecision('summa_sell').default(0.0).notNull(),  // price
    status: text('status').default('bought').notNull(), // статус машины (bought-куплена, installment - в рассрочке, sold - выплачена)
    
    buy_price: doublePrecision('buy_price').default(0.0).notNull(),  // price in market
    buy_terms: doublePrecision('buy_terms').default(0.0).notNull(),  // terms
    payment_day: integer('payment_day').default(1).notNull(),

    customerName: text('customerName').default('').notNull(), // имя покупателя
    customerPhone: text('customerPhone').default('').notNull(), // телефон покупателя
    customerAddress: text('customerAddress').default('').notNull(), // адрес покупателя
    customerPassport: text('customerPassport').default('').notNull(), // паспорт покупателя
  },
);