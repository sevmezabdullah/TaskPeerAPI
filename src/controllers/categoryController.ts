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

    /**
     * @description Kategori oluşturur
     * @param request 
     * @param response 
     * @returns 
     * @memberof CategoryController
     * @throws {Error}
     */
    async onCreate(request: Request, response: Response) {

        const result = await this.service.createCategory(request.body);
        return response.status(result.statusCode).json(result);
    }

    /**
     * @description Kategori günceller
     * @param request 
     * @param response 
     * @returns
     * @memberof CategoryController
     * @throws {Error}
     */
    async onUpdate(request: Request, response: Response) {
        const result = await this.service.updateCategory(request.body);
        return response.status(result.statusCode).json(result);

    }

    /**
     * 
     * @description Kategori siler
     * @param request 
     * @param response 
     * @returns
     * @memberof CategoryController
     * @throws {Error}
     */

    async onDelete(request: Request, response: Response) {
        const categoryId = Number(request.query.categoryId)

        console.log("🚀 ~ file: categoryController.ts:59 ~ CategoryController ~ onDelete ~ categoryId:", categoryId)
        const id = Number(categoryId)
        const result = await this.service.deleteCategory(id);
        return response.status(result.statusCode).json(result);


    }

    async onGetByUserId(request: Request, response: Response) {
        const userId = Number(request.params.userId);
        const result = await this.service.getCategories(userId);
        return response.status(result.statusCode).json(result);
    }

    async onGetByCategoryId(request: Request, response: Response) {
        const categoryId = Number(request.query.categoryId);
        const result = await this.service.getCategoryById(categoryId);
        if (result.responseObject) {
            result.responseObject = result.responseObject[0];
        }
        return response.status(result.statusCode).json(result);

    }

    async getAll(request: Request, response: Response) {
        const userId = Number(request.params.userId);
        const result = await this.service.getCategories(userId);
        return response.status(result.statusCode).json(result);


    }




}