import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { RabbitmqModule } from '../rabbit-mq/rabbit-mq.module';

@Module({
    imports: [RabbitmqModule],
    controllers: [
        UserController
    ],
    providers: []
})
export class ControllerModule { }