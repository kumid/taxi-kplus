 
import { doublePrecision, index, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const cards = pgTable(
  'cards',
  {
    id: serial('id').primaryKey(),
    name: text('name').default('').notNull(), //  "ПСБ"
    rate: doublePrecision('rate').default(5.0).notNull(), //  5
    offer_short: text('offer_short').default('').notNull(),//  "Онлайн для новых клиентов"
    offer_short_sum: text('offer_short_sum').default('').notNull(), //  "до 30 000 ₽"
    grace_period: text('grace_period').default('').notNull(),  // "120 дней"
    service: text('service').default('').notNull(), // "Бесплатно"
    opening_card: text('opening_card').default('').notNull(), // "Бесплатно"
    cashback: text('cashback').default('').notNull(), //"1% за любые покупки"
    release_date: text('release_date').default('').notNull(), //"от 1 до 7 дней"
    credits: text('credits').default('').notNull(), //"Любая кредитная история"
    additionally: text('additionally').default('').notNull(), //"Рабочий телефон"
    registration: text('registration').default('').notNull(), //"Постоянная или временная в РФ"
    term: text('term').default('').notNull(), //"15 минут"  сроки
    approval: text('approval').default('').notNull(), //"Среднее"
    views: integer('views').default(0).notNull(), //4525
    advantage: text('advantage').default('').notNull(), //"Первый займ под 0%"
    loan_sum: text('loan_sum').default('').notNull(), //"3 000₽ - 30 000₽"
    age: text('age').default('').notNull(), //"от 18 лет"
    docs: text('docs').default('').notNull(), //"Паспорт, снилс"
    schedule: text('schedule').default('').notNull(), //"Круглосуточно"
    license: text('license').default('').notNull(), //"№111111"
    offer_detail: text('offer_detail').default('').notNull(), //"ПСБ - высокий уровень одобрения — мы выдаем более тысячи займов ежедневно. Наша клиентская база состоит из миллионов клиентов, 85% которых рекомендуют нас своим друзьям и близким. Мы предлагаем самые выгодные условия для повторных клиентов — для них действуют сниженные процентные ставки и увеличение срока займов. Новые клиенты могут оформить займ под 0%.  ПСБ - высокий уровень одобрения — мы выдаем более тысячи займов ежедневно. Наша клиентская база состоит из миллионов клиентов, 85% которых рекомендуют нас своим друзьям и близким. Мы предлагаем самые выгодные условия для повторных клиентов — для них действуют сниженные процентные ставки и увеличение срока займов. Новые клиенты могут оформить займ под 0%."
    image: text('image').default('').notNull(), // "https://firebasestorage.googleapis.com/v0/b/my-poster-b3932.appspot.com/o/credit7.png?alt=media&token=f6967b32-19d8-4252-b46f-05a1df5cd3c0"
    active: text('active').default('').notNull(), // true
    site: text('site').default('').notNull(), // "U2FsdGVkX1+PaTxss5b+2+c2InkUcgml18Le2FLtV6nl56O7scUDqg==",
    lang: text('lang').default('ru').notNull(),
  },
);