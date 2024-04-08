import { id, inject, injectable } from "inversify";
import { User } from "../entities/UserEntity";
import { IResponse } from "../interfaces/IResponse";
import { IUserService } from "../interfaces/user/IUserServices";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { IToken } from "../interfaces/IToken";
import { Hash } from "../lib/hash";
import { INTERFACE_TYPE } from "../utils";
import { IHash } from "../interfaces/IHash";
import { ResponseStatus, ServiceResponse } from "../utils/ServiceResponse";
import { StatusCodes } from "http-status-codes";


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



    async login(email: string, password: string): Promise<ServiceResponse<{ token: string } | null>> {

        try {

            const result = this.repository.login(email);
            console.log(result)

            return new ServiceResponse(ResponseStatus.Success, "Kullanıcı doğrulandı", { token: '' }, StatusCodes.OK)

        } catch (error: any) {
            return new ServiceResponse(ResponseStatus.Failed, error.message, null, StatusCodes.OK)
        }

    }
    register(email: string, password: string): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
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