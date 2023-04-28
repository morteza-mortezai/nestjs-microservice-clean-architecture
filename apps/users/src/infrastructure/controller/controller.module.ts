import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { HttpModule } from '@nestjs/axios';
import { RepositoriesModule } from '../repository/repositories.module';

@Module({
    imports: [
        UsecaseProxyModule.register(),
        HttpModule,
        RepositoriesModule
    ],
    controllers: [
        UserController
    ],
    providers: []
})
export class ControllerModule { }