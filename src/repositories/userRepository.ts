import { injectable } from "inversify";
import { IResponse } from "../interfaces/IResponse";
import { IUserRepository } from "../interfaces/user/IUserRepository";


import { DB } from "../db/db.connection";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";




@injectable()
export class UserRepository implements IUserRepository {
    async googleRegister(email: string, hashedPassword: string): Promise<any> {
        const savedUser = await DB.insert(user).values({ email: email, password: hashedPassword, isVerified: true }).returning();

        console.log("🚀 ~ file: userRepository.ts:18 ~ UserRepository ~ googleRegister ~ savedUser:", savedUser)


        if (savedUser[0]) {
            return savedUser[0];
        } else {
            throw new Error("Google ile kayıt oluşturulamadı.");
        }
    }
    async googleLogin(email: string): Promise<any> {
        const result = await DB.select().from(user).where(eq(user.email, email))
        if (result) {
            return result[0];
        } else {
            return null;
        }
    }
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
        if (result) {
            return {
                email: email,
            };
        }
        return null;
    }
    async getAllUsers(): Promise<any | null> {
        const result = await DB.select().from(user).execute();
        if (result.length > 0) {
            return result;
        } else {
            return null;
        }
    }
    async forgotPassword(email: string): Promise<any | null> {
        const result = await DB.select().from(user).where(eq(user.email, email))
        if (result) {
            return result[0];
        } else {
            return null;
        }
    }
    async resetPassword(email: string, password: string): Promise<any | null> {

        const result = await DB.update(user).set({ password: password }).where(eq(user.email, email)).execute();

        if (result) {
            return result[0];
        }
        return result;

    }
    async updateProfile(id: string, user: any): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }
    async deleteUser(email: string): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }
    async getUserByEmail(email: string): Promise<any | null> {
        const result = await DB.select().from(user).where(eq(user.email, email))
        if (result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    }
    async getUserById(id: number): Promise<any | null> {
        const result = await DB.select().from(user).where(eq(user.id, id))
        if (result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    }
    async updateUser(email: string, user: any): Promise<IResponse> {
        throw new Error("Method not implemented.");
    }

}