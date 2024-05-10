import express from 'express';
import { upload } from '../middleware/multer';
import { envConfig } from '../utils/envConfig';
import { Container } from 'inversify';
import { INTERFACE_TYPE } from '../utils';
import { TaskService } from '../services/taskService';
import { TaskRepository } from '../repositories/taskRepository';
import { TaskController } from '../controllers/taskController';
import { FileUploader } from '../lib/upload_file';
const taskRouter = express.Router();


const container = new Container();


container.bind(INTERFACE_TYPE.TaskService).to(TaskService)
container.bind(INTERFACE_TYPE.TaskRepository).to(TaskRepository)
container.bind(INTERFACE_TYPE.TaskController).to(TaskController)
container.bind(INTERFACE_TYPE.FileUploader).to(FileUploader)


const controller = container.get<TaskController>(INTERFACE_TYPE.TaskController)


taskRouter.post(`${envConfig.API_PREFIX}/create`, upload.single('file'), controller.onCreateTask.bind(controller))
taskRouter.get(`${envConfig.API_PREFIX}/getTasks/:userId`, controller.onGetTasks.bind(controller))
taskRouter.get(`${envConfig.API_PREFIX}/getTaskByCategoryId/:categoryId`, controller.onGetTaskByCategoryId.bind(controller))



export default taskRouter;