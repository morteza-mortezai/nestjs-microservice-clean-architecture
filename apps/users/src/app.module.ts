import { Module } from '@nestjs/common';
import { EnvironmentModule } from './infrastructure/config/environment/environment.module';
import { ControllerModule } from './infrastructure/controller/controller.module';
import { TypeormModule } from './infrastructure/config/typeorm/typeorm.module';


@Module({
  imports: [EnvironmentModule, ControllerModule, TypeormModule],
  controllers: [],
  providers: [],

})
export class AppModule { }
