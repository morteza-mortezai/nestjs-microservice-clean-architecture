import { Module } from '@nestjs/common';
import { EnvironmentModule } from './infrastructure/environment/environment.module';
import { ControllerModule } from './infrastructure/controller/controller.module';
import { DatabaseModule } from './infrastructure/config/database/database.module';


@Module({
  imports: [EnvironmentModule, ControllerModule, DatabaseModule],
  controllers: [],
  providers: [],

})
export class AppModule { }
