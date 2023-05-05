import { Module } from '@nestjs/common';
import { SomeModuleController } from './some-module.controller';


@Module({
  imports: [],
  controllers: [SomeModuleController],
  providers: [],
})
export class SomeModule { }
