
import { User } from "../../models/UserModel"
import { ServiceResponse } from "../../utils/ServiceResponse"


export interface IUserService {
    login(email: string, password: string): Promise<ServiceResponse<{ token: string } | null>>
    register(email: string, password: string): Promise<ServiceResponse>
    googleLogin(email: string): Promise<ServiceResponse<{ token: string } | null>>
    getAllUsers(): Promise<ServiceResponse>
    forgotPassword(email: string): Promise<ServiceResponse>
    resetPassword(email: string, password: string): Promise<ServiceResponse>
    updateProfile(id: string, user: User): Promise<ServiceResponse>
    deleteUser(email: string): Promise<ServiceResponse>
    getUserByEmail(email: string): Promise<ServiceResponse>
    getUserById(id: string): Promise<ServiceResponse>
    updateUser(email: string, user: User): Promise<ServiceResponse>
    updatePassword(token: string, password: string): Promise<ServiceResponse>
    verifyEmail(email: string): Promise<ServiceResponse>
}