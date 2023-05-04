import { Module } from '@nestjs/common';
import { EnvironmentModule } from '../config/environment/environment.module';
import { RMQ_SERVICES } from '@app/common/constants/rmq.constant';
import { ClientsModule, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { EnvironmentService } from '../config/environment/environment.service';

@Module({
    imports: [EnvironmentModule],
    controllers: [],
    providers: [
        //mailer service
        {
            provide: RMQ_SERVICES.MAILER,
            useFactory: (environmentService: EnvironmentService) => {
                const rabbitMQOptions = environmentService.getRabbitMQOptions(RMQ_SERVICES.MAILER);
                return ClientProxyFactory.create(rabbitMQOptions);
            },
            inject: [EnvironmentService],
        }
    ],
    exports: [RMQ_SERVICES.MAILER]
})
export class RabbitmqModule { }
