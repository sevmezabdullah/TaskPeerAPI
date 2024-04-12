import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { IToken } from '../interfaces/IToken';
import { INTERFACE_TYPE } from '../utils';

@injectable()
export class AuthHandler {

    private tokenService: IToken;

    constructor(@inject(INTERFACE_TYPE.Token) token: IToken) {
        this.tokenService = token;
    }

    async verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        const checkedToken = await this.tokenService.verifyToken(token ?? '');
        if (checkedToken === null) {
            return res.status(401).json({ message: 'Token gerekli' });
        }
        else if (!checkedToken) {
            return res.status(401).json({ message: 'Geçersiz token' });
        }
        // Check if token is valid
        // If token is invalid, return 401
        // If token is valid, call next()
        next();
    }
}