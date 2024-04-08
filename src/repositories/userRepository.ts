import { injectable } from "inversify";
import { IResponse } from "../interfaces/IResponse";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { User } from "../models/UserModel";

import { DB } from "../db/db.connection";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";


export const users: User[] = [
    { id: 1, email: 'alice@example.com', password: '', createdAt: new Date(), updatedAt: new Date(), deviceToken: '', userId: 1 },

];

@injectable()
export class UserRepository implements IUserRepository {
    async login(email: string): Promise<User> {

        const result = await DB.select().from(user).where(eq(user.email, email))
        console.log(result)

        return {
            id: 1,
            email: '',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            deviceToken: '',
            userId: 1
        };
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
    getUserByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getUserById(id: string): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }
    updateUser(email: string, user: any): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }

}