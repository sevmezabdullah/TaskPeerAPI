import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { envConfig } from "./src/utils/envConfig";
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import path from 'path'

async function runMigration() {
    try {
        console.log('Migration Başlıyor...')
        const pool = new Pool({
            connectionString: envConfig.DB_URL
        })
        const db = drizzle(pool)
        await migrate(db, {
            migrationsFolder: './src/db/migrations'
        })


        console.log('Migration Tamamlandı')
        pool.end()


    } catch (error) {
        console.error('Migration Hatası', error)
    }
}

runMigration()