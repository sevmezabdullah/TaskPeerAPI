import { inject, injectable } from "inversify";

import { IUserService } from "../interfaces/user/IUserServices";
import { INTERFACE_TYPE } from "../utils";
import { Request, Response } from "express";
import { ICategoryService } from "../interfaces/category/ICategoryService";

@injectable()
export class CategoryController {

    private service: ICategoryService;

    constructor(
        @inject(INTERFACE_TYPE.CategoryService) service: ICategoryService) {
        this.service = service;
    }

    async onCreate(request: Request, response: Response) {

        const result = await this.service.createCategory(request.body);
        return response.status(result.statusCode).json(result);
    }

    async onUpdate(request: Request, response: Response) {
        const result = await this.service.updateCategory(request.body);
        return response.status(result.statusCode).json(result);

    }

    async onDelete(request: Request, response: Response) {
        const categoryId = request.params.categoryId
        const id = Number(categoryId)
        const result = await this.service.deleteCategory(id);
        return response.status(result.statusCode).json(result);


    }

    async onGetByUserId(request: Request, response: Response) {

    }

    async onGetByCategoryId(request: Request, response: Response) {

    }

    async getAll(request: Request, response: Response) {
        const userId = Number(request.params.userId);
        const result = await this.service.getCategories(userId);
        return response.status(result.statusCode).json(result);


    }




}