import { DynamicModule, Module } from '@nestjs/common';
import { UsecaseProxy } from './usecase-proxy'
import { ConfirmMailUsecase } from '../../usecase/sendConfirmMail.usecase'
import { AppMailerModule } from '../app-mailer/app-mailer.module';
import { AppMailerService } from '../app-mailer/app-mailer.service';

@Module({
    imports: [
        AppMailerModule
    ]
})
export class UsecaseProxyModule {
    static SEND_CONFIRM_EMAIL_USECASES_PROXY = 'sendConfirmEmailUsecasesProxy';

    static register(): DynamicModule {
        return {
            module: UsecaseProxyModule,
            providers: [
                {
                    inject: [AppMailerService],
                    provide: UsecaseProxyModule.SEND_CONFIRM_EMAIL_USECASES_PROXY,
                    useFactory: (appMailerService: AppMailerService) => new UsecaseProxy(new ConfirmMailUsecase(appMailerService))
                },

            ],
            exports: [
                UsecaseProxyModule.SEND_CONFIRM_EMAIL_USECASES_PROXY,

            ]
        }
    }
}