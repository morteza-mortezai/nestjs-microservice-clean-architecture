import { Module } from '@nestjs/common';
import { EnvironmentModule } from './infrastructure/environment/environment.module';
import { ControllerModule } from './infrastructure/controllers/controller.module';


@Module({
    imports: [EnvironmentModule, ControllerModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
