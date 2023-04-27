import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        UsecaseProxyModule.register(),
        HttpModule,

    ],
    controllers: [
        UserController
    ],
    providers: []
})
export class ControllerModule { }