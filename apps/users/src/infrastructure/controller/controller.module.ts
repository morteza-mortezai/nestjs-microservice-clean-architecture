import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { HttpModule } from '@nestjs/axios';
import { DiskStoreModule } from '../disk-store/disk-store.module';

@Module({
    imports: [
        UsecaseProxyModule.register(),
        HttpModule,
        DiskStoreModule
    ],
    controllers: [
        UserController
    ],
    providers: []
})
export class ControllerModule { }