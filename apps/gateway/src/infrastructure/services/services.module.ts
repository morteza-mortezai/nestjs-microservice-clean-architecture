import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
    imports: [RabbitmqModule],
    controllers: [],
    providers: [UsersService],
    exports: [UsersService]
})
export class ServicesModule { }
