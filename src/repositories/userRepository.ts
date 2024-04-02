import { IResponse } from "../interfaces/IResponse";
import { IUserRepository } from "../interfaces/user/IUserRepository";

export class UserRepository implements IUserRepository {
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
    updateProfile(id: string, user: any): Promise<IResponse> {
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
    updateUser(email: string, user: any): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }

}