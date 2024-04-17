export interface IToken {
    generateToken(data: any, expire: string | null): Promise<string>
    verifyToken(token: string): Promise<any>
    generatePasswordResetToken(data: any): Promise<string>
}