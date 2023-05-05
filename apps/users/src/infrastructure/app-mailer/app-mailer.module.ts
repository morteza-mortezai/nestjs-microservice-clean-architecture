import { Module } from '@nestjs/common';
import { NodeMailerModule } from '../../framework/node-mailer/node-mailer.module';
import { AppMailerService } from './app-mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EnvironmentService } from '../../infrastructure/config/environment/environment.service';

@Module({
    imports: [NodeMailerModule,
        // MailerModule.forRootAsync({
        //     useFactory: (environmentService: EnvironmentService) => ({
        //         transport: environmentService.getMailerTransport(),
        //     }),
        //     inject: [EnvironmentService]
        // }),
    ],
    providers: [AppMailerService],
    exports: [AppMailerService]
})
export class AppMailerModule { }
