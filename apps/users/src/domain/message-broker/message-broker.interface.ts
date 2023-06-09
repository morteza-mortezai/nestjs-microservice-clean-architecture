import { UserM } from "../model/user";
export interface IMessageBrokerService {
    emitUserCreatedEvent(newUser: UserM): Promise<void>,
    // downloadAndSaveAvatar(url: string, hashedName: string): Promise<any>
}