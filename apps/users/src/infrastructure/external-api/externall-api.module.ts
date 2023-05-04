import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvironmentModule } from '../config/environment/environment.module';
import { EnvironmentService } from '../config/environment/environment.service';
import { ExternallApiService } from './externall-api.service';
import { ExceptionsModule } from '../../../../../libs/common/src/exceptions/exceptions.module';
import { DiskStorageAvatarModule } from '../disk-storage-avatar/disk-storage-avatar.module';

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [EnvironmentModule],
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