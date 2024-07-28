import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { INTERFACE_TYPE } from "../utils";


@injectable()
export class TaskController {


    private service: TaskService

    constructor(@inject(INTERFACE_TYPE.TaskService) service: TaskService) {
        this.service = service
    }


    /**
     * 
     * @description Task oluşturur
     * @param request 
     * @param response 
     * @returns {Promise<any>}
     * @memberof TaskController
     * @throws {Error}
     */
    async onCreateTask(request: Request, response: Response) {
        const customRequest: any = request
        customRequest.body.userId = Number.parseInt(customRequest.body.userId)
        customRequest.body.categoryId = Number.parseInt(customRequest.body.categoryId)
        const body = customRequest.body
        const file = customRequest.file
        if (!file) {
            const result = await this.service.createTask(body, file)
            return response.status(result.statusCode).json(result)
        } else {
            const result = await this.service.createTask(body, null)
            return response.status(result.statusCode).json(result)
        }


    }


    /**
     * @description Task id'sine göre taskı günceller
     * @param request 
     * @param response 
     * @returns
     * @memberof TaskController
     * @throws {Error}
     */
    async onUpdateTask(request: Request, response: Response) {

        const customRequest: any = request
        customRequest.body.taskId = Number.parseInt(customRequest.body.taskId)
        const taskId = customRequest.body.taskId
        const body = customRequest.body
        const file = customRequest.file
        const result = await this.service.updateTask(taskId, body, file)
        return response.status(result.statusCode).json(result)
    }

    /**
     * 
     * @description Kullanıcıya ait taskları getirir
     * @param request 
     * @param response 
     * @returns {Promise<any>}
     * @memberof TaskController
     * @throws {Error}
     */

    async onGetTasks(request: Request, response: Response) {

        const userId = Number.parseInt(request.params.userId)
        const result = await this.service.getTaskByUserId(userId)
        return response.status(result.statusCode).json(result)
    }

    /**
     * @description Kategori id'sine göre taskları getirir
     * @param request 
     * @param response 
     * @returns 
     * @memberof TaskController
     * @throws {Error}
     */
    async onGetTaskByCategoryId(request: Request, response: Response) {
        const categoryId = Number.parseInt(request.params.categoryId)
        const result = await this.service.getTaskByCategoryId(categoryId)
        return response.status(result.statusCode).json(result)
    }


    /**
     * @description Task id'sine göre task getirir
     * @param request 
     * @param response 
     * @returns
     * @memberof TaskController
     * @throws {Error}
     */
    async onGetTaskByIsRoutine(request: Request, response: Response) {
        const isRoutine = Boolean(request.params.isRoutine)
        const userId = Number(request.query.userId)
        const result = await this.service.getTaskByIsRoutine(isRoutine, userId)
        return response.status(result.statusCode).json(result)
    }

    /**
     * @description Task id'sine göre taskı siler - durumunu aktif den pasife çeker
     * @param request 
     * @param response 
     * @returns
     * @memberof TaskController
     * @throws {Error}
     */
    async onDeleteTask(request: Request, response: Response) {
        const taskId = Number(request.query.taskId)
        const result = await this.service.deleteTask(taskId)
        return response.status(result.statusCode).json(result)
    }

    async onGetStatistics(request: Request, response: Response) {
        const userId = Number(request.query.userId)


        return response.status(200).json([])
    }

}