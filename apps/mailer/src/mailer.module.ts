import { Module } from '@nestjs/common';
import { MailerController } from './infrastructure/controllers/mailer.controller';
import { EnvironmentModule } from './infrastructure/environment/environment.module';
import { UsecaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';


@Module({
  imports: [EnvironmentModule, UsecaseProxyModule.register()],
  controllers: [MailerController],
  providers: [],
})
export class MailerModule { }
