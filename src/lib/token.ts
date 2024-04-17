import { injectable } from "inversify";
import { IToken } from "../interfaces/IToken";
import jwt from 'jsonwebtoken'
import { envConfig } from "../utils/envConfig";
@injectable()
export class Token implements IToken {
    async generateToken(data: any, expire: string | null): Promise<string> {
        const token = await jwt.sign({ data }, envConfig.JWT_SECRET, expire ? { expiresIn: expire } : {})
        return token
    }
    async verifyToken(token: string): Promise<any> {
        const data = await jwt.verify(token, envConfig.JWT_SECRET)
        return Promise.resolve(data)
    }

    async generatePasswordResetToken(data: any): Promise<string> {
        const token = await jwt.sign({ data }, envConfig.JWT_SECRET, { expiresIn: '7d' })
        return token
    }

}