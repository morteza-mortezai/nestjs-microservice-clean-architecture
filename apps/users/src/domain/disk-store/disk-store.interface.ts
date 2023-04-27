import { UserM } from "../model/user";

export interface IDiskStore {
    getFile(id: number): Promise<UserM>,
    writeStream(response: any, path: string): Promise<any>,
}