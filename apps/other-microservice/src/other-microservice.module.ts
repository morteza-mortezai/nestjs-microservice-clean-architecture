import { Module } from '@nestjs/common';
import { SomeModule } from './some-module/some-module.module';
import { EnvironmentModule } from './environment/environment.module';


@Module({
  imports: [SomeModule, EnvironmentModule],
  controllers: [],
  providers: [],
})
export class OtherMicroserviceModule { }
