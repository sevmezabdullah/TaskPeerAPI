import { Task } from "../../models/TaskModel";


export interface ITaskRepository {
    createTask(task: Task): Promise<any>
    getTaskById(id: number): Promise<Task>
    getAllTasks(): Promise<Task[]>
    updateTask(id: number, task: Task): Promise<any>
    deleteTask(id: number): Promise<any>
    getTaskByUserId(userId: number): Promise<Task[]>
    getTaskByCategoryId(categoryId: number): Promise<Task[]>

    getTaskByIsRoutine(isRoutine: boolean, userId: number): Promise<Task[]>
    getTaskByIsCompleted(isCompleted: boolean, userId: number): Promise<Task[]>
    getStatistics(userId: number, startDate: Date, endDate: Date): Promise<any>

}