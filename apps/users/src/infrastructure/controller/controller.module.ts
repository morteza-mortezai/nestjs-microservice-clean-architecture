import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { HttpModule } from '@nestjs/axios';
import { DataSourceModule } from '../data-source/data-source.module';
import { MessageBrokerModule } from '../message-broker/message-broker.module';

@Module({
    imports: [
        UsecaseProxyModule.register(),
        HttpModule,
        DataSourceModule,
        MessageBrokerModule
    ],
    controllers: [
        UserController
    ],
    providers: []
})
export class ControllerModule { }