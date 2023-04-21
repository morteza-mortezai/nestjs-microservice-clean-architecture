import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './environment.validate'
@Module({
  imports: [
    ConfigModule.forRoot({

      isGlobal: true, // حذف شود و تست شود
      validationSchema,
      envFilePath: './apps/gateway/env/local.env'
    })
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService]
})
export class EnvironmentModule { }
