import express from 'express';
import { Container } from 'inversify';

import { INTERFACE_TYPE } from '../utils';


import { envConfig } from '../utils/envConfig';
import { ICategoryService } from '../interfaces/category/ICategoryService';
import { CategoryService } from '../services/categoryService';
import { CategoryRepository } from '../repositories/categoryRepository';
import { ICategoryRepository } from '../interfaces/category/ICategoryRepository';
import { CategoryController } from '../controllers/categoryController';


const categoryRouter = express.Router();
const container = new Container();

container.bind<ICategoryService>(INTERFACE_TYPE.CategoryService).to(CategoryService)
container.bind<ICategoryRepository>(INTERFACE_TYPE.CategoryRepository).to(CategoryRepository)
container.bind(INTERFACE_TYPE.CategoryController).to(CategoryController)

const controller = container.get<CategoryController>(INTERFACE_TYPE.CategoryController)




categoryRouter.post(`${envConfig.API_PREFIX}/create`, controller.onCreate.bind(controller))
categoryRouter.delete(`${envConfig.API_PREFIX}/delete`, controller.onDelete.bind(controller))
categoryRouter.put(`${envConfig.API_PREFIX}/update`, controller.onUpdate.bind(controller))
categoryRouter.get(`${envConfig.API_PREFIX}/getByUserId/:userId`, controller.onGetByUserId.bind(controller))
categoryRouter.get(`${envConfig.API_PREFIX}/getByCategoryId`, controller.onGetByCategoryId.bind(controller));
categoryRouter.get(`${envConfig.API_PREFIX}/getByUserId`, controller.onGetByUserId.bind(controller))


export default categoryRouter;