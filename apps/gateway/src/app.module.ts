import { Module } from '@nestjs/common';
import { EnvironmentModule } from './infrastructure/environment/environment.module';


@Module({
    imports: [EnvironmentModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
