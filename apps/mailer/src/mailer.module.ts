import { Module } from '@nestjs/common';
import { MailerController } from './infrastructure/controllers/mailer.controller';


@Module({
  imports: [],
  controllers: [MailerController],
  providers: [],
})
export class MailerModule { }
