import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './environment.validate'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: 'env/local.env'
    })
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService]
})
export class EnvironmentModule { }
