
import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, timestamp, text, boolean, numeric } from "drizzle-orm/pg-core";
import { user } from "./user";


export const passwordToken = pgTable('user', {
    id: serial("id").primaryKey(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    user_id: serial("user_id").references(() => user.id),
    token: text("token").notNull().unique(),
})


export type PasswordToken = InferSelectModel<typeof passwordToken>