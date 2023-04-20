import { Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ServicesModule } from './infrastructure/services/services.module';
import { EnvironmentModule } from './infrastructure/environment/environment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ControllersModule, ServicesModule,


    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
