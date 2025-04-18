import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/schema';
import 'dotenv/config'; 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function main() { 

    // const user = await Promise.all(
    //     await db
    //       .insert(schema.users)
    //       .values({
    //         name: "test@test.com",
    //         password: "test",
    //         email: "test@test.com"
    //       })
    //       .returning()
    //     );
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
