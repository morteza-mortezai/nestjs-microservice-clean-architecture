import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [UserController],
  providers: [],
})
export class ControllersModule { }
