import { UserM } from "../model/user";

export interface IExternallApiService {
    getUserById(id: number): Promise<UserM>
}