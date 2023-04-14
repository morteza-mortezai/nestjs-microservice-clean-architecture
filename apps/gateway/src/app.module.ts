import { Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ServicesModule } from './infrastructure/services/services.module';
import { EnvironmentModule } from './infrastructure/environment/environment.module';

@Module({
    imports: [ControllersModule, ServicesModule, EnvironmentModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
