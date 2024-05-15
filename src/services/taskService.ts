import { inject, injectable } from "inversify";
import { ITaskService } from "../interfaces/task/ITaskService";
import { Task } from "../models/TaskModel";
import { ResponseStatus, ServiceResponse } from "../utils/ServiceResponse";
import { TaskRepository } from "../repositories/taskRepository";
import { INTERFACE_TYPE } from "../utils";
import { FileUploader } from "../lib/upload_file";


@injectable()
export class TaskService implements ITaskService {


    private repository: TaskRepository;
    private uploadFile: FileUploader;


    constructor(@inject(INTERFACE_TYPE.TaskRepository) repository: TaskRepository, @inject(INTERFACE_TYPE.FileUploader) uploadFile: FileUploader) {
        this.repository = repository;
        this.uploadFile = uploadFile;
    }
    getStatistics(userId: number): Promise<ServiceResponse<null>> {
        throw new Error("Method not implemented.");
    }

    /**
     * @description Task oluşturur
     * @param task 
     * @param file 
     * @returns {Promise<ServiceResponse>}
     * @memberof TaskService
     * @throws {Error}
     */
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

    /**
     * @description Task günceller
     * @param {number} id
     * @param {Task} task
     * @param {any} file
     * @returns {Promise<ServiceResponse>}
     * @memberof TaskService
     * @throws {Error}
     */
    async updateTask(id: number, task: Task, file: any): Promise<ServiceResponse> {
        try {
            if (file) {
                const uploadFile = await this.uploadFile.uploadFile(file);
                task.audioSource = uploadFile;
            }
            const result = await this.repository.updateTask(id, task);
            if (result) {
                return new ServiceResponse(ResponseStatus.Success, "Task güncellendi", null, 200)
            } else {
                return new ServiceResponse(ResponseStatus.Failed, "Task güncellenirken hata meydana geldi", null, 400)
            }
        } catch (error) {

            console.log("🚀 ~ file: taskService.ts:80 ~ TaskService ~ updateTask ~ error:", error)
            return new ServiceResponse(ResponseStatus.Failed, "Task güncellenirken hata meydana geldi", null, 500)
        }
    }

    /**
     * @description Task siler
     * @param {number} id
     * @returns {Promise<ServiceResponse>}
     * @memberof TaskService
     * @throws {Error}
     */
    async deleteTask(id: number): Promise<ServiceResponse> {

        try {
            const result = await this.repository.deleteTask(id);
            if (result) {
                return new ServiceResponse(ResponseStatus.Success, "Task silindi", null, 200)
            } else {
                return new ServiceResponse(ResponseStatus.Failed, "Task silinirken hata meydana geldi", null, 400)
            }
        } catch (error) {
            return new ServiceResponse(ResponseStatus.Failed, "Task silinirken hata meydana geldi", null, 500)
        }

    }

    /**
     * @description Kullanıcıya ait taskları getirir
     * @param {number} userId
     * @returns {Promise<ServiceResponse>}
     * @memberof TaskService
     * @throws {Error}
     */
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

    /**
     * @description Kategori id'sine göre taskları getirir
     * @param {number} categoryId
     * @returns {Promise<ServiceResponse>}
     * @memberof TaskService
     * @throws {Error}
     */
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


    /**
     * @description Rutinliğe göre taskları getirir
     * @param {boolean} isRoutine
     * @param {number} userId
     * @returns {Promise<ServiceResponse>}
     * @memberof TaskService
     * @throws {Error}
     */
    async getTaskByIsRoutine(isRoutine: boolean, userId: number): Promise<ServiceResponse> {
        try {
            const result = await this.repository.getTaskByIsRoutine(isRoutine, userId);


            if (result) {
                return new ServiceResponse(ResponseStatus.Success, "Tasklar getirildi", result, 200)
            } else {
                return new ServiceResponse(ResponseStatus.Failed, "Tasklar getirilirken hata meydana geldi", null, 400)
            }
        } catch (error) {

            console.log("🚀 ~ file: taskService.ts:96 ~ TaskService ~ getTaskByIsRoutine ~ error:", error)
            return new ServiceResponse(ResponseStatus.Failed, "Tasklar getirilirken hata meydana geldi", null, 500)
        }
    }

    /**
     * @description Tamamlanan tasklara göre taskları getirir
     * @param {boolean} isCompleted
     * @param {number} userId
     * @returns {Promise<ServiceResponse>}
     * @memberof TaskService
     * @throws {Error}
     */
    async getTaskByIsCompleted(isCompleted: boolean, userId: number): Promise<ServiceResponse> {

        try {
            const result = await this.repository.getTaskByIsCompleted(isCompleted, userId);
            if (result) {
                return new ServiceResponse(ResponseStatus.Success, "Tasklar getirildi", result, 200)
            } else {
                return new ServiceResponse(ResponseStatus.Failed, "Tasklar getirilirken hata meydana geldi", null, 400)
            }
        } catch (error) {
            return new ServiceResponse(ResponseStatus.Failed, "Tasklar getirilirken hata meydana geldi", null, 500)
        }
    }

}