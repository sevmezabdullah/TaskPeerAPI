
import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, timestamp, text, boolean, numeric } from "drizzle-orm/pg-core";


export const user = pgTable('user', {
    id: serial("id").primaryKey(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    deviceToken: text("device_token").unique(),
    isVerified: boolean("is_verified").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    isPremium: boolean("is_premium").notNull().default(false),
    premiumStartDate: timestamp("premium_start_date"),
    avatar: text("avatar"),
    role: numeric("role").notNull().default("0"),
})


export type User = InferSelectModel<typeof user>