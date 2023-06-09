import { Module } from '@nestjs/common';
import { RMQ_SERVICES } from '@app/common/constants/rmq.constant';
import { ClientProxyFactory } from '@nestjs/microservices';
import { EnvironmentService } from '../environment/environment.service';
import { RabbitmqService } from './rabbit-mq.service';

@Module({

    controllers: [],
    providers: [
        {
            provide: RMQ_SERVICES.MAILER,
            useFactory: (environmentService: EnvironmentService) => {
                const rabbitMQOptions = environmentService.getRabbitMQOptions(RMQ_SERVICES.MAILER);
                return ClientProxyFactory.create(rabbitMQOptions);
            },
            inject: [EnvironmentService],
        },
        RabbitmqService
    ],
    exports: [RMQ_SERVICES.MAILER, RabbitmqService]
})
export class RabbitmqModule { }
