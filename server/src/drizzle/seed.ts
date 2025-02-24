import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/schema';
import 'dotenv/config';
import { faker } from '@faker-js/faker';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function main() {
  // const cardIds = await Promise.all(
  //   Array(5)
  //     .fill('')
  //     .map(async () => {
  //       const user = await db
  //         .insert(schema.cards)
  //         .values({
  //           name: "ПСБ",
  //           rate: 5,
  //           offer_short: "Онлайн для новых клиентов",
  //           offer_short_sum: "до 30 000 ₽",
  //           srok: "15 минут",
  //           approval: "Среднее",
  //           views: 4525,
  //           advantage: "Первый займ под 0%",
  //           loan_sum: "3 000₽ - 30 000₽",
  //           age: "от 18 лет",
  //           docs: "Паспорт, снилс",
  //           schedule: "Круглосуточно",
  //           license: "№111111",
  //           offer_detail: "ПСБ - высокий уровень одобрения — мы выдаем более тысячи займов ежедневно. Наша клиентская база состоит из миллионов клиентов, 85% которых рекомендуют нас своим друзьям и близким. Мы предлагаем самые выгодные условия для повторных клиентов — для них действуют сниженные процентные ставки и увеличение срока займов. Новые клиенты могут оформить займ под 0%.  ПСБ - высокий уровень одобрения — мы выдаем более тысячи займов ежедневно. Наша клиентская база состоит из миллионов клиентов, 85% которых рекомендуют нас своим друзьям и близким. Мы предлагаем самые выгодные условия для повторных клиентов — для них действуют сниженные процентные ставки и увеличение срока займов. Новые клиенты могут оформить займ под 0%.",
  //           image: "https://firebasestorage.googleapis.com/v0/b/my-poster-b3932.appspot.com/o/credit7.png?alt=media&token=f6967b32-19d8-4252-b46f-05a1df5cd3c0",
  //           active: true,
  //           site: "U2FsdGVkX1+9EGkspu5qPO3Wgv/YZcV0A6g3Jna5yZnMPmGJtxZ8NQ=="
  //         })
  //         .returning();
  //       return user[0].id;
  //     }),
  // );

  const loanIds = await Promise.all(
    Array(5)
      .fill('')
      .map(async () => {
        const user = await db
          .insert(schema.loans)
          .values({
            name: "ПСБ",
            rate: 5,
            offer_short: "Онлайн для новых клиентов",
            offer_short_sum: "до 30 000 ₽",
            srok: "15 минут",
            approval: "Среднее",
            views: 4525,
            advantage: "Первый займ под 0%",
            loan_sum: "3 000₽ - 30 000₽",
            age: "от 18 лет",
            docs: "Паспорт, снилс",
            schedule: "Круглосуточно",
            license: "№111111",
            offer_detail: "ПСБ - высокий уровень одобрения — мы выдаем более тысячи займов ежедневно. Наша клиентская база состоит из миллионов клиентов, 85% которых рекомендуют нас своим друзьям и близким. Мы предлагаем самые выгодные условия для повторных клиентов — для них действуют сниженные процентные ставки и увеличение срока займов. Новые клиенты могут оформить займ под 0%.  ПСБ - высокий уровень одобрения — мы выдаем более тысячи займов ежедневно. Наша клиентская база состоит из миллионов клиентов, 85% которых рекомендуют нас своим друзьям и близким. Мы предлагаем самые выгодные условия для повторных клиентов — для них действуют сниженные процентные ставки и увеличение срока займов. Новые клиенты могут оформить займ под 0%.",
            image: "https://firebasestorage.googleapis.com/v0/b/my-poster-b3932.appspot.com/o/credit7.png?alt=media&token=f6967b32-19d8-4252-b46f-05a1df5cd3c0",
            active: true,
            site: "U2FsdGVkX1+9EGkspu5qPO3Wgv/YZcV0A6g3Jna5yZnMPmGJtxZ8NQ=="
          })
          .returning();
        return user[0].id;
      }),
  );



}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
