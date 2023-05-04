import { UserM } from "../model/user";
export interface IMessageBrokerService {
    emitUserCreatedEventToMailer(newUser: UserM): Promise<void>,
    // downloadAndSaveAvatar(url: string, hashedName: string): Promise<any>
}