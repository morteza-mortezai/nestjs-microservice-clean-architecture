import { IAppMailer } from "../domain/abstracts/app-mailer.abstract";
import { UserM } from "../domain/model/user";


export class ConfirmMailUsecase {
    constructor(
        private readonly appMailer: IAppMailer,
    ) { }

    async sendEmail({ email }: UserM) {
        const econfirmMail = {
            email,
            from: 'noreply@payever.com',
            subject: 'Please Confirm Your Email Address',
            text: 'Confirmation Text and Link'
        }
        const result = await this.appMailer.sendMail(econfirmMail)
        return result
    }
}