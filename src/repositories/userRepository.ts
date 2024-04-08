import { injectable } from "inversify";
import { IResponse } from "../interfaces/IResponse";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { User } from "../models/UserModel";

import { DB } from "../db/db.connection";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";


export const users: User[] = [

];

@injectable()
export class UserRepository implements IUserRepository {
    async login(email: string): Promise<any | null> {

        const result = await DB.select().from(user).where(eq(user.email, email))
        if (result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    }
    async register(email: string, password: string): Promise<any | null> {

        const result = await DB.insert(user).values({ email: email, password: password }).execute();
        return result;
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