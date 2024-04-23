
import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, timestamp, text, boolean, numeric, integer } from "drizzle-orm/pg-core";
import { user } from "./user";


export const category = pgTable('categories', {
    id: serial("id").primaryKey(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
    title: text("title").notNull(),
    color: text("color").notNull(),
    emoji: text("emoji"),
    userId: integer('userId').notNull().references(() => user.id),
    isActive: boolean('isActive').notNull().default(true),
})


export type Category = InferSelectModel<typeof category>