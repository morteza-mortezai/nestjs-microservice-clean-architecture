// import { Injectable, Inject } from '@nestjs/common';
// import { IAppMailer } from '../../domain/app-mailer/app-mailer.abstract';
// import { UserM } from '../../domain/model/user';
// import { APP_MAILER } from '../config/constants/app-mailer.constant';
// import { NodeMailerService } from '../node-mailer/node-mailer.service';


// @Injectable()
// export class AppMailerService implements IAppMailer {
//     constructor(private readonly nodeMailerService: NodeMailerService) { }

//     async sendConfirmEmail(user: UserM): Promise<boolean> {
//         return this.nodeMailerService
//             .sendEmail({
//                 to: user.email,
//                 from: APP_MAILER.FROM,
//                 subject: APP_MAILER.CONFIRM_SUBJECT,
//                 text: APP_MAILER.CONFIRM_TEXT,
//             })
//     }
// }
