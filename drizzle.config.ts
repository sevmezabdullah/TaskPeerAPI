import { defineConfig } from "drizzle-kit";
import { envConfig } from "./src/utils/envConfig";

export default defineConfig({
    schema: './src/db/schema/*',
    out: './src/db/migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: envConfig.DB_URL,
    },
    verbose: true,
    strict: true,
})