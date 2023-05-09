import { IAppMailer } from "../domain/abstracts/app-mailer.abstract";
import { UserM } from "../domain/model/user";


export class ConfirmMailUsecase {
    constructor(
        private readonly mailService: IAppMailer,
    ) { }
    // it would be better to use transactions here .
    // unfortunately TYPEORM/MongoDB doesn't support it yet. 
    async sendMail(newUser: UserM) {
        // const exist = await this.mailService.sendMail(newUser.email)
    }
}