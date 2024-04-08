
import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, timestamp, integer, text } from "drizzle-orm/pg-core";

export const user = pgTable('user', {
    id: serial("id").primaryKey(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
    userId: integer("user_id").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    deviceToken: text("device_token").unique(),
})


export type User = InferSelectModel<typeof user>