import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { EnvironmentService } from '../environment/environment.service';
import { AppMailerService } from './app-mailer.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (environmentService: EnvironmentService) => ({
                transport: environmentService.getMailerTransport(),
            }),
            inject: [EnvironmentService]
        }),

    ],
    providers: [AppMailerService],
    exports: [AppMailerService]
})
export class AppMailerModule { }