import { Module } from '@nestjs/common';
import { MailerController } from './infrastructure/controllers/mailer.controller';
import { EnvironmentModule } from './infrastructure/environment/environment.module';


@Module({
  imports: [EnvironmentModule],
  controllers: [MailerController],
  providers: [],
})
export class MailerModule { }
