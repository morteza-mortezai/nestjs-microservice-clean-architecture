import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { EnvironmentService } from '../../infrastructure/config/environment/environment.service';
import { NodeMailerService } from './node-mailer.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (environmentService: EnvironmentService) => ({
                transport: environmentService.getMailerTransport(),
            }),
            inject: [EnvironmentService]
        }),

    ],
    providers: [NodeMailerService],
    exports: [NodeMailerService]
})
export class NodeMailerModule { }