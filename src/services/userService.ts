import { User } from "../entities/UserEntity";
import { IResponse } from "../interfaces/IResponse";
import { IUserService } from "../interfaces/user/IUserServices";

export class UserService implements IUserService {
    login(email: string, password: string): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }
    register(email: string, password: string): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }
    getAllUsers(): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }
    forgotPassword(email: string): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }
    resetPassword(email: string, password: string): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }
    updateProfile(id: string, user: User): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }
    deleteUser(email: string): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }
    getUserById(id: string): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }
    updateUser(email: string, user: User): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }

}