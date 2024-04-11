import { injectable } from "inversify";
import { IToken } from "../interfaces/IToken";
import jwt from 'jsonwebtoken'
import { envConfig } from "../utils/envConfig";
@injectable()
export class Token implements IToken {
    async generateToken(data: any): Promise<string> {
        const token = await jwt.sign({ data }, envConfig.JWT_SECRET)
        return token
    }
    async verifyToken(token: string): Promise<any> {
        const data = await jwt.verify(token, 'secretKey')
        return Promise.resolve(data)
    }

}