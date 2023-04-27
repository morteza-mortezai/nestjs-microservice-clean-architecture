export interface IHashService {
    generateHashForName(plainText: string | number, rounds?: number): Promise<string>
}