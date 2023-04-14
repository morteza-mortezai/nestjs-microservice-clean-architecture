import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { RmqModule } from '@app/common';
import { RMQ_SERVICE } from '../constants/rmq.constants';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';

@Module({
    imports: [RmqModule.register({ name: RMQ_SERVICE.USERS }, EnvironmentService), EnvironmentModule],
    controllers: [],
    providers: [UserService],
})
export class ServicesModule { }
