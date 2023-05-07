
export abstract class IAppMailer {
    abstract sendMail(email: string, text: string): Promise<void>;
}
