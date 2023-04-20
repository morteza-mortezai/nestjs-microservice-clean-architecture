import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
    imports: [RabbitmqModule],
    controllers: [],
    providers: [UserService],
    exports: [UserService]
})
export class ServicesModule { }
