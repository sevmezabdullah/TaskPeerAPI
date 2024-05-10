import { Task } from "../../models/TaskModel";


export interface ITaskRepository {
    createTask(task: Task): Promise<any>
    getTaskById(id: number): Promise<Task>
    getAllTasks(): Promise<Task[]>
    updateTask(id: number, task: Task): Promise<any>
    deleteTask(id: number): Promise<any>
    getTaskByUserId(userId: number): Promise<Task[]>
    getTaskByCategoryId(categoryId: number): Promise<Task[]>
    getTaskByStatus(status: string): Promise<Task[]>
    getTaskByIsRoutine(isRoutine: boolean): Promise<Task[]>
    getTaskByIsCompleted(isCompleted: boolean): Promise<Task[]>

}