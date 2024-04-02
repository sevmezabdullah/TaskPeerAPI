import { injectable } from "inversify";
import { IHash } from "../interfaces/IHash";
import bcrypt from 'bcrypt'


@injectable()
export class Hash implements IHash {
    async hashPassword(data: string): Promise<string> {
        const result = await bcrypt.hash(data, 10)
        if (result) {
            return result
        }
        throw new Error('Password could not hash')
    }
    async comparePassword(data: string, hash: string): Promise<boolean> {
        const result = await bcrypt.compare(data, hash)
        return result
    }

}