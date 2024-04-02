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

}