

import { User } from "../../models/UserModel"
import { IResponse } from "../IResponse"

export interface IUserRepository {
    login(email?: string): Promise<User | null | undefined>
    register(email: string, password: string): Promise<IResponse>
    getAllUsers(): Promise<IResponse>
    forgotPassword(email: string): Promise<IResponse>
    resetPassword(email: string, password: string): Promise<IResponse>
    updateProfile(id: string, user: any): Promise<IResponse>
    deleteUser(email: string): Promise<IResponse>
    getUserByEmail(email: string): Promise<User>
    getUserById(id: string): Promise<IResponse>
    updateUser(email: string, user: any): Promise<IResponse>
}