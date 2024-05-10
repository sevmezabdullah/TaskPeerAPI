import { inject, injectable } from "inversify";
import { ITaskService } from "../interfaces/task/ITaskService";
import { Task } from "../models/TaskModel";
import { ResponseStatus, ServiceResponse } from "../utils/ServiceResponse";
import { TaskRepository } from "../repositories/taskRepository";
import { INTERFACE_TYPE } from "../utils";
import { FileUploader } from "../lib/upload_file";
import moment from "moment";

@injectable()
export class TaskService implements ITaskService {


    private repository: TaskRepository;
    private uploadFile: FileUploader;


    constructor(@inject(INTERFACE_TYPE.TaskRepository) repository: TaskRepository, @inject(INTERFACE_TYPE.FileUploader) uploadFile: FileUploader) {
        this.repository = repository;
        this.uploadFile = uploadFile;
    }

    async createTask(task: Task, file: any): Promise<ServiceResponse> {
        try {
            const uploadFile = await this.uploadFile.uploadFile(file);
            task.audioSource = uploadFile;

            const result = await this.repository.createTask(task);
            if (result) {
                return new ServiceResponse(ResponseStatus.Success, "Task oluşturuldu", null, 200)
            } else {
                return new ServiceResponse(ResponseStatus.Failed, "Task oluşturulurken hata meydana geldi", null, 400)
            }

        } catch (error) {
            console.log(error)
            return new ServiceResponse(ResponseStatus.Failed, "Task oluşturulurken hata meydana geldi", null, 500)
        }


    }
    async getTaskById(id: number): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    async getAllTasks(): Promise<ServiceResponse<null>> {
        throw new Error("Method not implemented.");
    }
    async updateTask(id: number, task: Task): Promise<ServiceResponse<null>> {
        throw new Error("Method not implemented.");
    }
    async deleteTask(id: number): Promise<ServiceResponse<null>> {
        throw new Error("Method not implemented.");
    }
    async getTaskByUserId(userId: number): Promise<ServiceResponse<any>> {
        try {
            const result = await this.repository.getTaskByUserId(userId);
            if (result) {
                return new ServiceResponse(ResponseStatus.Success, "Tasklar getirildi", result, 200)
            } else {
                return new ServiceResponse(ResponseStatus.Failed, "Tasklar getirilirken hata meydana geldi", null, 400)
            }

        } catch (error) {
            console.log(error)

            return new ServiceResponse(ResponseStatus.Failed, "Tasklar getirilirken hata meydana geldi", null, 500)
        }
    }
    async getTaskByCategoryId(categoryId: number): Promise<ServiceResponse> {

        try {
            const result = await this.repository.getTaskByCategoryId(categoryId);
            if (result) {
                return new ServiceResponse(ResponseStatus.Success, "Tasklar getirildi", result, 200)
            } else {
                return new ServiceResponse(ResponseStatus.Failed, "Tasklar getirilirken hata meydana geldi", null, 400)
            }
        } catch (error) {

            return new ServiceResponse(ResponseStatus.Failed, "Tasklar getirilirken hata meydana geldi", null, 500)
        }
    }
    async getTaskByStatus(status: string): Promise<ServiceResponse<null>> {
        throw new Error("Method not implemented.");
    }
    async getTaskByIsRoutine(isRoutine: boolean): Promise<ServiceResponse<null>> {
        throw new Error("Method not implemented.");
    }
    async getTaskByIsCompleted(isCompleted: boolean): Promise<ServiceResponse<null>> {
        throw new Error("Method not implemented.");
    }

}