
import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, timestamp, text, boolean, numeric, integer, date } from "drizzle-orm/pg-core";
import { user } from "./user";
import { category } from "./categories";


export const task = pgTable('tasks', {
    id: serial("id").primaryKey(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    reminderAt: timestamp('remindDateTime').notNull(),
    isRoutine: boolean("isRoutine").notNull().default(false),
    taskTitle: text("taskTitle").notNull(),
    task: text("task").notNull(),
    audioSource: text("audioSource"),
    isDone: boolean("isDone").notNull().default(false),
    isDoneDate: timestamp("isDoneDate"),
    deletedDate: timestamp("deletedDate"),
    isActive: boolean("isActive").notNull().default(true),
    userId: integer('userId').notNull().references(() => user.id),
    categoryId: integer('categoryId').notNull().references(() => category.id)


})


export type Task = InferSelectModel<typeof task>