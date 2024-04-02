import { User } from "../../entities/UserEntity"
import { IResponse } from "../IResponse"

export interface IUserService {
    login(email: string, password: string): Promise<IResponse>
    register(email: string, password: string): Promise<IResponse>
    getAllUsers(): Promise<IResponse>
    forgotPassword(email: string): Promise<IResponse>
    resetPassword(email: string, password: string): Promise<IResponse>
    updateProfile(id: string, user: User): Promise<IResponse>
    deleteUser(email: string): Promise<IResponse>
    getUserByEmail(email: string): Promise<IResponse>
    getUserById(id: string): Promise<IResponse>
    updateUser(email: string, user: User): Promise<IResponse>
}