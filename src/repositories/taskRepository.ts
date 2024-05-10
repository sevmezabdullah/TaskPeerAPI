import { DB } from "../db/db.connection";
import { ITaskRepository } from "../interfaces/task/ITaskRepository";
import { Task } from "../models/TaskModel";
import { task } from "../db/schema";
import { injectable } from "inversify";
import { eq } from "drizzle-orm";
@injectable()
export class TaskRepository implements ITaskRepository {
    async createTask(record: Task): Promise<any> {

        record.reminderAt = new Date(1715380721);

        console.log("🚀 ~ file: taskRepository.ts:13 ~ TaskRepository ~ createTask ~ record.reminderAt:", record.reminderAt)

        const result = await DB.insert(task).values({
            taskTitle: record.taskTitle,
            task: record.task,
            audioSource: record.audioSource,
            isRoutine: record.isRoutine,
            reminderAt: record.reminderAt,
            userId: record.userId,
            categoryId: record.categoryId
        }).execute();
        if (result) {
            return result;
        }
        throw new Error("Task oluşturulurken hata meydana geldi.");

    }

    async getTaskByUserId(userId: number): Promise<any> {
        const result = await DB.select().from(task).where(eq(task.userId, userId)).execute();
        if (result) {
            return result;
        }
        throw new Error("Tasklar getirilirken hata meydana geldi.");
    }
    async getTaskById(id: number): Promise<Task> {


        throw new Error("Task bulunamadı.");
    }
    async getAllTasks(): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    async updateTask(id: number, task: Task): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async deleteTask(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getTaskByCategoryId(categoryId: number): Promise<any> {
        const result = await DB.select().from(task).where(eq(task.categoryId, categoryId)).execute();
        if (result) {
            return result;
        }
        throw new Error("Tasklar getirilirken hata meydana geldi.");
    }
    async getTaskByStatus(status: string): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    async getTaskByIsRoutine(isRoutine: boolean): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    async getTaskByIsCompleted(isCompleted: boolean): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }

}