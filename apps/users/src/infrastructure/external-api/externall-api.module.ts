import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';

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
    providers: [],
    exports: []
})
export class ExternallApiModule { }