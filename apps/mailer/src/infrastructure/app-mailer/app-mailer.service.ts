import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IEmail } from '../../domain/interface/email.interface';
import { IAppMailer } from '../../domain/abstracts/app-mailer.abstract';

@Injectable()
export class AppMailerService implements IAppMailer {
    constructor(private readonly mailerService: MailerService) { }

    async sendMail({ email, from, subject, text }: IEmail): Promise<any> {
        return this.mailerService
            .sendMail({
                to: email,
                from,
                subject,
                text,
            })
        // .then(() => { return true })
        // .catch(() => { return false });
    }
}
