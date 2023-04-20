import { UserM } from "../model/user";

export interface UserRepository {
    insert(user: UserM): Promise<UserM>
    findByEmail(email: string): Promise<UserM | undefined>
}