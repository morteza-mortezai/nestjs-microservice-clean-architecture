import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { diModule } from '../di/di.module';

@Module({
    imports: [diModule.register()],
    controllers: [UserController],
    providers: []
})
export class ControllerModule { }