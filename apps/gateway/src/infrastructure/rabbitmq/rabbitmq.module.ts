import { Module } from '@nestjs/common';
import { EnvironmentModule } from '../environment/environment.module';
import { RMQ_SERVICES } from '../constants/rmq.constants';
import { ClientsModule, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { EnvironmentService } from '../environment/environment.service';

@Module({
    imports: [EnvironmentModule],
    controllers: [],
    providers: [
        //billing service
        {
            provide: RMQ_SERVICES.BILLING,
            useFactory: (environmentService: EnvironmentService) => {
                const rabbitMQOptions = environmentService.getRabbitMQOptions(RMQ_SERVICES.BILLING);
                console.log('op', rabbitMQOptions)
                return ClientProxyFactory.create(rabbitMQOptions);
            },
            inject: [EnvironmentService],
        }
    ],
    exports: [RMQ_SERVICES.BILLING]
})
export class RabbitmqModule { }
