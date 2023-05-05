import { Module } from '@nestjs/common';
import { RabbitmqModule } from '../config/rabbit-mq/rabbit-mq.module';
import { MessageBrokerService } from './message-broker.service';

@Module({
    imports: [RabbitmqModule],
    providers: [MessageBrokerService],
    exports: [MessageBrokerService]
})
export class MessageBrokerModule { }
