import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { HttpModule } from '@nestjs/axios';
import { DataSourceModule } from '../data-source/data-source.module';

@Module({
    imports: [
        UsecaseProxyModule.register(),
        HttpModule,
        DataSourceModule
    ],
    controllers: [
        UserController
    ],
    providers: []
})
export class ControllerModule { }