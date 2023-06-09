import { UserM } from "../model/user";

export interface IUserDataSource {
    insert(user: UserM): Promise<UserM>
    findByEmail(email: string): Promise<UserM | undefined>
}