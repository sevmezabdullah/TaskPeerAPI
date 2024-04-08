import {
    inject, injectable
} from "inversify";


import { IUserService } from "../interfaces/user/IUserServices";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { IToken } from "../interfaces/IToken";
import { Hash } from "../lib/hash";
import { INTERFACE_TYPE } from "../utils";
import { IHash } from "../interfaces/IHash";
import { ResponseStatus, ServiceResponse } from "../utils/ServiceResponse";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/UserModel";


@injectable()
export class UserService implements IUserService {

    private repository: IUserRepository;
    private token: IToken
    private hash: Hash


    constructor(@inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository, @inject(INTERFACE_TYPE.Token) token: IToken, @inject(INTERFACE_TYPE.Hash) hash: IHash) {
        this.repository = repository;
        this.token = token;
        this.hash = hash;
    }



    async login(email: string, password: string): Promise<ServiceResponse<any | undefined>> {

        try {

            const result = await this.repository.login(email);

            if (result !== null) {
                return new ServiceResponse(ResponseStatus.Success, "Kullanıcı doğrulandı", result, StatusCodes.OK)
            }
            else
                return new ServiceResponse(ResponseStatus.Failed, "Kullanıcı doğrulanamadı", null, StatusCodes.OK)


        } catch (error: any) {
            return new ServiceResponse(ResponseStatus.Failed, error.message, null, StatusCodes.OK)
        }

    }
    async register(email: string, password: string): Promise<ServiceResponse<any | undefined>> {

        const hashedPassword = await this.hash.hashPassword(password);

        try {
            const result = await this.repository.register(email, hashedPassword);
            return new ServiceResponse(ResponseStatus.Success, "Kullanıcı başarıyla oluşturuldu", result, StatusCodes.OK)
        } catch (error: any) {

            if (error.code === '23505') {
                return new ServiceResponse(ResponseStatus.Failed, "Bu email adresi zaten kullanımda", null, StatusCodes.BAD_REQUEST)
            }

            return new ServiceResponse(ResponseStatus.Failed, error, null, StatusCodes.OK)
        }

    }
    getAllUsers(): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    forgotPassword(email: string): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    resetPassword(email: string, password: string): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    updateProfile(id: string, user: User): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    deleteUser(email: string): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    getUserById(id: string): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    updateUser(email: string, user: User): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }

}