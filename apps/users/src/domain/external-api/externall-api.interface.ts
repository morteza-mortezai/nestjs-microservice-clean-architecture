import { UserM } from "../model/user";

export interface UserExternallApi {
    getUserById(id: number): Promise<UserM>
}