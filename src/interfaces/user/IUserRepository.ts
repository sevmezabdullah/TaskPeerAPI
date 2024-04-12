

import { User } from "../../models/UserModel"


export interface IUserRepository {
    login(email?: string): Promise<User | null | undefined>
    register(email: string, password: string): Promise<any | null>
    googleLogin(email: string): Promise<any | null>
    googleRegister(email: string, hashedPassword: string): Promise<any | null>
    getAllUsers(): Promise<any | null>
    forgotPassword(email: string): Promise<any | null>
    resetPassword(email: string, password: string): Promise<any | null>
    updateProfile(id: string, user: any): Promise<any | null>
    deleteUser(email: string): Promise<any | null>
    getUserByEmail(email: string): Promise<User>
    getUserById(id: number): Promise<any | null>
    updateUser(email: string, user: any): Promise<any | null>
}