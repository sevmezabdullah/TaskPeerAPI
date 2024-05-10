import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { INTERFACE_TYPE } from "../utils";
import moment from "moment";

@injectable()
export class TaskController {


    private service: TaskService

    constructor(@inject(INTERFACE_TYPE.TaskService) service: TaskService) {
        this.service = service
    }


    async onCreateTask(request: Request, response: Response) {
        const customRequest: any = request
        customRequest.body.userId = Number.parseInt(customRequest.body.userId)
        customRequest.body.categoryId = Number.parseInt(customRequest.body.categoryId)

        const body = customRequest.body

        const file = customRequest.file



        const result = await this.service.createTask(body, file)
        return response.status(result.statusCode).json(result)
    }


    async onGetTasks(request: Request, response: Response) {

        const userId = Number.parseInt(request.params.userId)
        const result = await this.service.getTaskByUserId(userId)


        return response.status(result.statusCode).json(result)
    }
    async onGetTaskByCategoryId(request: Request, response: Response) {
        const categoryId = Number.parseInt(request.params.categoryId)
        const result = await this.service.getTaskByCategoryId(categoryId)
        return response.status(result.statusCode).json(result)
    }


}