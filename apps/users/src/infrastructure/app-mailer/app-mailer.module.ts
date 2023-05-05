import { Module } from '@nestjs/common';
import { NodeMailerModule } from '../node-mailer/node-mailer.module';
import { AppMailerService } from './app-mailer.service';

@Module({
    imports: [NodeMailerModule],
    providers: [AppMailerService],
    exports: [AppMailerService]
})
export class AppMailerModule { }