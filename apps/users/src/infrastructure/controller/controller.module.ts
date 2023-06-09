import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { RabbitmqModule } from '../config/rabbit-mq/rabbit-mq.module';

@Module({
    imports: [
        UsecaseProxyModule.register(), RabbitmqModule
    ],
    controllers: [
        UserController
    ],
    providers: []
})
export class ControllerModule { }