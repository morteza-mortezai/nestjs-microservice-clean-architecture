// import { Injectable, Inject } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';
// import { IEmail } from '../../domain/email/email.interface';

// @Injectable()
// export class NodeMailerService {
//     constructor(private readonly mailerService: MailerService) { }

//     async sendEmail({ to, from, subject, text }: IEmail): Promise<boolean> {
//         return this.mailerService
//             .sendMail({
//                 to,
//                 from,
//                 subject,
//                 text,
//             })
//             .then(() => { return true })
//             .catch(() => { return false });
//     }
// }
