import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

import { envConfig } from "../utils/envConfig";


const pool = new Pool({
    connectionString: envConfig.DB_URL
});

export const DB: NodePgDatabase<typeof schema> = drizzle<typeof schema>(pool, { schema });