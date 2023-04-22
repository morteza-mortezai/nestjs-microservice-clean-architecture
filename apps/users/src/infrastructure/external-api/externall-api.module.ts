import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';
import { ExternallApiService } from './externall-api.service';

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [EnvironmentModule],
            useFactory: async (configService: EnvironmentService) => ({
                timeout: configService.getHttpTimeout(),
                maxRedirects: configService.getHttpMaxRedirects(),
            }),
            inject: [EnvironmentService],
        })
    ],
    controllers: [],
    providers: [ExternallApiService],
    exports: [ExternallApiService]
})
export class ExternallApiModule { }