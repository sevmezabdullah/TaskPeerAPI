import {
    inject, injectable
} from "inversify";


import { IUserService } from "../interfaces/user/IUserServices";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { IToken } from "../interfaces/IToken";
import { Hash } from "../lib/hash";
import { INTERFACE_TYPE } from "../utils";
import { IHash } from "../interfaces/IHash";
import { ResponseStatus, ServiceResponse } from "../utils/ServiceResponse";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/UserModel";
import { Email } from "../lib/email";
import crypto from "crypto";



@injectable()
export class UserService implements IUserService {

    private repository: IUserRepository;
    private tokenService: IToken
    private hash: Hash
    private emailService: Email;


    constructor(@inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository, @inject(INTERFACE_TYPE.Token) token: IToken, @inject(INTERFACE_TYPE.Hash) hash: IHash, @inject(INTERFACE_TYPE.Email) email: Email) {
        this.repository = repository;
        this.tokenService = token;
        this.hash = hash;
        this.emailService = email;
    }
    async googleLogin(email: string): Promise<ServiceResponse<{ token: string; } | null>> {

        try {
            const result = await this.repository.googleLogin(email);

            if (result !== undefined && result !== null) {
                const token = await this.tokenService.generateToken(result)
                return new ServiceResponse(ResponseStatus.Success, "Kullanıcı doğrulandı", { token: token }, StatusCodes.OK)
            }
            else {

                const generatedPassword = crypto.randomBytes(20).toString('hex');
                const hashedPassword = await this.hash.hashPassword(generatedPassword);
                const savedUser = await this.repository.googleRegister(email, hashedPassword);
                console.log(savedUser)
                if (savedUser) {
                    const token = await this.tokenService.generateToken(savedUser)
                    return new ServiceResponse(ResponseStatus.Success, "Kullanıcı doğrulandı", { token: token }, StatusCodes.OK)
                }

                return new ServiceResponse(ResponseStatus.Failed, "Kullanıcı doğrulanamadı", null, StatusCodes.OK)
            }
        } catch (error) {
            return new ServiceResponse(ResponseStatus.Failed, "Giriş esnasında hata meydana geldi", null, StatusCodes.BAD_REQUEST)
        }




    }



    async login(email: string, password: string): Promise<ServiceResponse<any | undefined>> {

        try {
            const result = await this.repository.login(email);
            if (result !== null) {

                const isPasswordTrue = await this.hash.comparePassword(password, result?.password ?? '')
                if (isPasswordTrue && result?.isVerified) {
                    const token = await this.tokenService.generateToken(result)
                    return new ServiceResponse(ResponseStatus.Success, "Kullanıcı doğrulandı", { token: token }, StatusCodes.OK)
                } else if (isPasswordTrue && !result?.isVerified) {
                    return new ServiceResponse(ResponseStatus.Failed, "E-Posta adresinize gönderdiğimiz talimatları takip ederek aktivasyonunuzu tamamladıktan sonra tekrar deneyiniz.", null, StatusCodes.BAD_REQUEST)
                }
                else {
                    return new ServiceResponse(ResponseStatus.Failed, "Email veya şifreniz hatalı. Lütfen tekrar deneyin.", null, StatusCodes.BAD_REQUEST)
                }
            }
            else
                return new ServiceResponse(ResponseStatus.Failed, "Kullanıcı doğrulanamadı", null, StatusCodes.OK)


        } catch (error: any) {
            return new ServiceResponse(ResponseStatus.Failed, error.message, null, StatusCodes.OK)
        }

    }
    async register(email: string, password: string): Promise<ServiceResponse<any | undefined>> {
        try {
            const hashedPassword = await this.hash.hashPassword(password);

            const result = await this.repository.register(email, hashedPassword);

            if (result) {
                this.emailService.sendVerificationEmail(email, 'token');
            }

            return new ServiceResponse(ResponseStatus.Success, "Kullanıcı başarıyla oluşturuldu", result, StatusCodes.OK)
        } catch (error: any) {

            if (error.code === '23505') {
                return new ServiceResponse(ResponseStatus.Failed, "Bu email adresi zaten kullanımda", null, StatusCodes.BAD_REQUEST)
            }

            return new ServiceResponse(ResponseStatus.Failed, error, null, StatusCodes.BAD_REQUEST)
        }

    }
    getAllUsers(): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    async forgotPassword(email: string): Promise<ServiceResponse> {
        const user = await this.repository.getUserByEmail(email);

        if (user) {
            const token = await this.tokenService.generateToken(user);
            this.emailService.sendVerificationEmail(email, token);
            return new ServiceResponse(ResponseStatus.Success, "E-Posta adresinize şifre sıfırlama talimatları gönderildi", null, StatusCodes.OK)
        }
        return new ServiceResponse(ResponseStatus.Failed, "Kullanıcı bulunamadı", null, StatusCodes.BAD_REQUEST)
    }
    resetPassword(email: string, password: string): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    updateProfile(id: string, user: User): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    deleteUser(email: string): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    getUserById(id: string): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }
    updateUser(email: string, user: User): Promise<ServiceResponse> {
        throw new Error("Method not implemented.");
    }

}