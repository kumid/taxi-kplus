import {
  boolean,
  doublePrecision,
  index,
  integer,
  pgTable,
  serial,
  text,
} from 'drizzle-orm/pg-core';

/// Данные покупателя
export const cars = pgTable('cars', {
  id: serial('id').primaryKey(),
  model: text('model').default('').notNull(),
  color: text('color').default('').notNull(),
  ctc: text('ctc').default('').notNull(),
  vin: text('vin').default('').notNull(),
  year: integer('year').default(2025).notNull(),
  organization: text('organization').default('').notNull(),
  summa_buy: doublePrecision('summa_buy').default(0.0).notNull(), // Цена покупки
  summa_sell: doublePrecision('summa_sell').default(0.0).notNull(), // Стоимость продажи
  status: text('status').default('Не выбрано').notNull(), // статус машины (bought-куплена, installment - в рассрочке, sold - выплачена)

  buy_price: doublePrecision('buy_price').default(0.0).notNull(), // price in market
  buy_terms: doublePrecision('buy_terms').default(0.0).notNull(), // terms - срок в месяцах
  first_payment: integer('first_payment').default(0).notNull(),
  payment_day: integer('payment_day').default(1).notNull(),
  payment: integer('payment').default(0).notNull(),

  customer_name: text('customer_name').default('').notNull(), // имя покупателя
  customer_phone: text('customer_phone').default('').notNull(), // телефон покупателя
  customer_address: text('customer_address').default('').notNull(), // адрес покупателя
  customer_passport: text('customer_passport').default('').notNull(), // паспорт покупателя

  customer_driver: text('customer_driver').default('').notNull(), // имя покупателя
  park_comission: doublePrecision('park_comission').default(3.5).notNull(),
  park_rent: doublePrecision('park_rent').default(80000.0).notNull(),
  tax: doublePrecision('tax').default(2000.0).notNull(),
  sign1: text('sign1').default('Мамадова Г.А.').notNull(),
  sign2: text('sign2').default('Даминов М.С.').notNull(),
  sign3: text('sign3').default('Эркинжанов С.Г.').notNull(),
  sign4: text('sign4').default('Юсупов Бахтиёр Иномидинович').notNull(),
  sign5: text('sign5').default('Тажибаев Жахангир Абдихалилович').notNull(),
  sign4tel: text('sign4tel').default('+79687653333').notNull(),
  sign5tel: text('sign5tel').default('+79258692383').notNull(),
  is_installment: boolean('is_installment').default(false).notNull(),
  installment_term: integer('installment_term').default(0).notNull(), 
  installment: integer('installment').default(0).notNull(), 
});
