import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvironmentService } from '../config/environment/environment.service';
import { ExternallApiService } from './externall-api.service';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { DiskStorageAvatarModule } from '../disk-storage-avatar/disk-storage-avatar.module';

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: async (configService: EnvironmentService) => ({
                timeout: configService.getHttpTimeout(),
                maxRedirects: configService.getHttpMaxRedirects(),
            }),
            inject: [EnvironmentService],
        }),
        ExceptionsModule,
        DiskStorageAvatarModule
    ],
    controllers: [],
    providers: [ExternallApiService],
    exports: [ExternallApiService]
})
export class ExternallApiModule { }