import { DB } from "../db/db.connection";
import { ITaskRepository } from "../interfaces/task/ITaskRepository";
import { Task } from "../models/TaskModel";
import { category, task } from "../db/schema";
import { injectable } from "inversify";
import { eq, and, between } from "drizzle-orm";
@injectable()
export class TaskRepository implements ITaskRepository {


    /** 
        * @description Task oluşturur
        * @param {Task} record
        * @returns {Promise<any>}
        * @memberof TaskRepository
        * @throws {Error}
        * 
    */
    async createTask(record: Task): Promise<any> {

        record.reminderAt = new Date(1715380721);
        const result = await DB.insert(task).values({
            taskTitle: record.taskTitle,
            task: record.task,
            audioSource: record.audioSource,
            isRoutine: record.isRoutine,
            reminderAt: record.reminderAt,
            userId: record.userId,
            categoryId: record.categoryId,
            routineDays: record.routineDays
        }).execute();
        if (result) {
            return result;
        }
        throw new Error("Task oluşturulurken hata meydana geldi.");

    }

    /**
     * @description Kullanıcıya ait taskları getirir
     * @param {number} userId
     * @returns {Promise<any>}
     * @memberof TaskRepository
     * @throws {Error}  
    */
    async getTaskByUserId(userId: number): Promise<any> {
        const result = await DB.select()
            .from(task)
            .where(and(eq(task.userId, userId), eq(task.isActive, true))).innerJoin(category, eq(task.categoryId, category.id)).execute();

        if (result) {
            return result;
        }
        throw new Error("Tasklar getirilirken hata meydana geldi.");
    }
    /**
     * @description Task id'sine göre task getirir
     * @param id 
     * @returns {Promise<any>}
     * @memberof TaskRepository
     * @throws {Error}
     */
    async getTaskById(id: number): Promise<any> {

        const result = await DB.select().from(task).where(eq(task.id, id)).execute();
        if (result) {
            return result[0];
        }
        throw new Error("Task bulunamadı.");
    }
    /**
     * @description Tüm taskları getirir
     * @returns {Promise<Task[]>}
     * @memberof TaskRepository
     * @throws {Error}
     */
    async getAllTasks(): Promise<any> {
        const result = await DB.select().from(task).execute();
        if (result) {
            return result;
        }
        throw new Error("Tasklar getirilirken hata meydana geldi.");
    }
    /**
     * @description Task günceller
     * @param {number} id
     * @param {Task} newTask
     * @returns {Promise<any>}
     * @memberof TaskRepository
     * @throws {Error}
     */
    async updateTask(id: number, newTask: Task): Promise<any> {
        const result = await DB.update(task).set({
            taskTitle: newTask.taskTitle,
            task: newTask.task,
            audioSource: newTask.audioSource,
            isRoutine: newTask.isRoutine,
            reminderAt: newTask.reminderAt,
            userId: newTask.userId,
            categoryId: newTask.categoryId,
            isDone: newTask.isDone,
            routineDays: newTask.routineDays

        }).where(eq(task.id, id)).execute();
        if (result) {
            return result;
        }
        throw new Error("Task güncellenirken hata meydana geldi.");
    }
    async deleteTask(id: number): Promise<any> {
        const result = await DB.update(task).set({
            isActive: false
        }).where(eq(task.id, id)).execute();
        if (result) {
            return result;
        }
        throw new Error("Task silinirken hata meydana geldi.");
    }

    /**
     * @description Kategori id'sine göre taskları getirir
     * @param {number} categoryId
     * @returns {Promise<any>}
     * @memberof TaskRepository
     * @throws {Error}
     */
    async getTaskByCategoryId(categoryId: number): Promise<any> {
        const result = await DB.select().from(task).where(eq(task.categoryId, categoryId)).execute();
        if (result) {
            return result;
        }
        throw new Error("Tasklar getirilirken hata meydana geldi.");
    }


    /**
     * @description Rutin tasklara göre taskları getirir
     * @param {boolean} isRoutine
     * @param {number} userId
     * @returns {Promise<any>}
     * @memberof TaskRepository
     * @throws {Error}
     */
    async getTaskByIsRoutine(isRoutine: boolean, userId: number): Promise<any> {
        const result = await DB.select().from(task).where(and(eq(task.isRoutine, isRoutine), eq(task.userId, userId))).execute();
        if (result) {
            return result;
        }
        throw new Error("Tasklar getirilirken hata meydana geldi.");
    }

    /**
     * @description Tamamlanan tasklara göre taskları getirir
     * @param {boolean} isCompleted
     * @param {number} userId
     * @returns {Promise<any>}
     * @memberof TaskRepository
     * @throws {Error}
     */
    async getTaskByIsCompleted(isCompleted: boolean, userId: number): Promise<any> {
        const result = await DB.select().from(task).where(and(eq(task.isDone, isCompleted), eq(task.userId, userId))).execute();
        if (result) {
            return result;
        }
        throw new Error("Tasklar getirilirken hata meydana geldi.");
    }

    async getStatistics(userId: number, startDate: Date, endDate: Date): Promise<any> {
        const result = await DB.select().from(task)
            .where(and(eq(task.userId, userId), between(task.isDoneDate, startDate, endDate)))
            .execute();
        if (result) {
            return result;
        }
        throw new Error("Tasklar getirilirken hata meydana geldi.");
    }
}