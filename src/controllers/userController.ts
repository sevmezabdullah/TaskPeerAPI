import { inject, injectable } from "inversify";

import { IUserService } from "../interfaces/user/IUserServices";
import { INTERFACE_TYPE } from "../utils";
import { Request, Response } from "express";

@injectable()
export class UserController {

    private service: IUserService;

    constructor(
        @inject(INTERFACE_TYPE.UserService) service: IUserService) {
        this.service = service;
    }

    async onLogin(request: Request, response: Response) {
        const email = request.body.email;
        const password = request.body.password;

        const result = await this.service.login(email, password);
        return response.status(result.statusCode).json(result);
    }

    async onRegister(request: Request, response: Response) {
        const email = request.body.email;
        const password = request.body.password;


        const result = await this.service.register(email, password);
        return response.status(result.statusCode).json(result);
    }

    async onForgotPassword(request: Request, response: Response) {
        const email = request.body.email;

        const result = await this.service.forgotPassword(email);
        return response.status(result.statusCode).json(result);
    }

    async onGoogleLogin(request: Request, response: Response) {
        const email = request.body.email;

        const result = await this.service.googleLogin(email);
        return response.status(result.statusCode).json(result);
    }
}