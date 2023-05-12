import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';

@Module({
    imports: [
        UsecaseProxyModule.register()
    ],
    controllers: [
        UserController
    ],
    providers: []
})
export class ControllerModule { }