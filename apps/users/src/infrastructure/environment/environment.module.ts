import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './environment.validate'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/billing/env/local.env',
      validationSchema,

    })
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService]
})
export class EnvironmentModule { }
