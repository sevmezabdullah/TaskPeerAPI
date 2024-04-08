import { User } from "../../entities/UserEntity"
import { ServiceResponse } from "../../utils/ServiceResponse"


export interface IUserService {
    login(email: string, password: string): Promise<ServiceResponse<{ token: string } | null>>
    register(email: string, password: string): Promise<ServiceResponse>
    getAllUsers(): Promise<ServiceResponse>
    forgotPassword(email: string): Promise<ServiceResponse>
    resetPassword(email: string, password: string): Promise<ServiceResponse>
    updateProfile(id: string, user: User): Promise<ServiceResponse>
    deleteUser(email: string): Promise<ServiceResponse>
    getUserByEmail(email: string): Promise<ServiceResponse>
    getUserById(id: string): Promise<ServiceResponse>
    updateUser(email: string, user: User): Promise<ServiceResponse>
}