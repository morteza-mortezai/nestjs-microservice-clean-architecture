import { UserM } from "../model/user";

export interface IDiskStore {
    getFile(id: number): Promise<UserM>
}