import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './environment.validate'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: './apps/gateway/env/local.env'
    })
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService]
})
export class EnvironmentModule { }
