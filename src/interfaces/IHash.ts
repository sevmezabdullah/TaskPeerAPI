export interface IHash {
    hashPassword(data: string): Promise<string>;
    comparePassword(data: string, hash: string): Promise<boolean>;
}