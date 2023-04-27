import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    generateHash(plainText: string, rounds: number = 10) {
        return bcrypt.hash(plainText, rounds);
    }

    async generateHashForName(plainText: string, rounds: number = 10) {
        const hashed = await this.generateHash(plainText, rounds)
        return hashed.replace(/\//g, "")
    }
}