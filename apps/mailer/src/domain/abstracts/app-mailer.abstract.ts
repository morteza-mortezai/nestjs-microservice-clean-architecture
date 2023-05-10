import { IEmail } from "../interface/email.interface";

export abstract class IAppMailer {
    abstract sendMail(email: IEmail): Promise<void>;
}
