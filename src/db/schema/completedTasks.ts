
import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { task } from "./task";


export const complatedTasks = pgTable('complatedTasks', {
    id: serial("id").primaryKey(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
    complated_at: timestamp("complated_at"),
    taskId: integer('userId').notNull().references(() => task.id),
    isDone: boolean('isDone').notNull().default(false),
})


export type ComplatedTasks = InferSelectModel<typeof complatedTasks>