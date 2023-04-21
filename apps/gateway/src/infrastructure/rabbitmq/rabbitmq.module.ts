import { Module } from '@nestjs/common';
import { EnvironmentModule } from '../environment/environment.module';
import { RMQ_SERVICES } from '../constants/rmq.constants';
import { ClientsModule, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { EnvironmentService } from '../environment/environment.service';

@Module({
    imports: [EnvironmentModule],
    controllers: [],
    providers: [
        //users service
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
