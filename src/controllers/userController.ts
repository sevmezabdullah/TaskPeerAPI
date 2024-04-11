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
        return response.json(result);
    }

    async onRegister(request: Request, response: Response) {
        const email = request.body.email;
        const password = request.body.password;


        const result = await this.service.register(email, password);
        return response.json(result);
    }
}