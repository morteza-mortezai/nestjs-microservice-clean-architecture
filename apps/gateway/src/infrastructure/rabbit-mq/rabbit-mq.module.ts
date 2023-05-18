import { Module } from '@nestjs/common';
import { RMQ_SERVICES } from '@app/common/constants/rmq.constant';
import { ClientProxyFactory } from '@nestjs/microservices';
import { EnvironmentService } from '../environment/environment.service';

@Module({

    controllers: [],
    providers: [
        {
            provide: RMQ_SERVICES.USERS,
            useFactory: (environmentService: EnvironmentService) => {
                const rabbitMQOptions = environmentService.getRabbitMQOptions(RMQ_SERVICES.USERS);
                return ClientProxyFactory.create(rabbitMQOptions);
            },
            inject: [EnvironmentService],
        }
    ],
    exports: [RMQ_SERVICES.USERS]
})
export class RabbitmqModule { }
