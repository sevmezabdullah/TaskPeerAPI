import express from 'express';
import { Container } from 'inversify';
import { IUserService } from '../interfaces/user/IUserServices';
import { INTERFACE_TYPE } from '../utils';
import { IUserRepository } from '../interfaces/user/IUserRepository';
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/userRepository';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '../docs/openApiResponseBuilders';
import { z } from 'zod';
import { Token } from '../lib/token';
import { Hash } from '../lib/hash';
import { Email } from '../lib/email';
import { envConfig } from '../utils/envConfig';

export const userRouterRegistry = new OpenAPIRegistry();
const userRouter = express.Router();
const container = new Container();

container.bind<IUserService>(INTERFACE_TYPE.UserService).to(UserService)
container.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository)
container.bind(INTERFACE_TYPE.UserController).to(UserController)
container.bind(INTERFACE_TYPE.Token).to(Token)
container.bind(INTERFACE_TYPE.Hash).to(Hash)
container.bind(INTERFACE_TYPE.Email).to(Email)
const controller = container.get<UserController>(INTERFACE_TYPE.UserController)



userRouterRegistry.registerPath({
    method: 'post',
    path: '/user',
    tags: ['User'],
    responses: createApiResponse(z.null(), 'Success'),
});


userRouter.post(`${envConfig.API_PREFIX}/auth/login`, controller.onLogin.bind(controller))
userRouter.post(`${envConfig.API_PREFIX}/auth/register`, controller.onRegister.bind(controller))
userRouter.get(`${envConfig.API_PREFIX}/auth/verify-email/:token`, controller.onEmailVerification.bind(controller))
userRouter.post(`${envConfig.API_PREFIX}/auth/change-password`, controller.onPasswordChangePost.bind(controller))
userRouter.get(`${envConfig.API_PREFIX}/auth/change-password`, controller.onPasswordChangeGet.bind(controller));
userRouter.post(`${envConfig.API_PREFIX}/auth/forget-password`, controller.onForgotPassword.bind(controller))
userRouter.post(`${envConfig.API_PREFIX}/auth/google`, controller.onGoogleLogin.bind(controller))
userRouter.get(`${envConfig.PAGE_PREFIX}/change-password/:token`, controller.onPasswordChange.bind(controller))

export default userRouter;