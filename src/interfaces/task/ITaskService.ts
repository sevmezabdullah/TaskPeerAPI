import { Task } from "../../models/TaskModel";
import { ServiceResponse } from "../../utils/ServiceResponse";

export interface ITaskService {
    createTask(task: Task, file: any): Promise<ServiceResponse>
    getTaskById(id: number): Promise<ServiceResponse>
    getAllTasks(): Promise<ServiceResponse>
    updateTask(id: number, task: Task, file: any): Promise<ServiceResponse>
    deleteTask(id: number): Promise<ServiceResponse>
    getTaskByUserId(userId: number): Promise<ServiceResponse>
    getTaskByCategoryId(categoryId: number): Promise<ServiceResponse>
    getTaskByIsRoutine(isRoutine: boolean, userId: number): Promise<ServiceResponse>
    getTaskByIsCompleted(isCompleted: boolean, userId: number): Promise<ServiceResponse>
    getStatistics(userId: number): Promise<ServiceResponse>
}