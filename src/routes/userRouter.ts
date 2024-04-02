import express from 'express';
import { Container } from 'inversify';
import { IUserService } from '../interfaces/user/IUserServices';
import { INTERFACE_TYPE } from '../utils';
import { IUserRepository } from '../interfaces/user/IUserRepository';
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/userRepository';

const userRouter = express.Router();
const container = new Container();

container.bind<IUserService>(INTERFACE_TYPE.UserService).to(UserService)
container.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository)
container.bind(INTERFACE_TYPE.UserController).to(UserController)
const controller = container.get<UserController>(INTERFACE_TYPE.UserController)