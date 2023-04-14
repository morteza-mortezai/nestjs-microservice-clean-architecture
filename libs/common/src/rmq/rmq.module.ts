import { Module, DynamicModule } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';


interface RmqModuleOptions {
    name: string;
}

@Module({
    providers: [RmqService],
    exports: [RmqService]
})
export class RmqModule {
    static register({ name }: RmqModuleOptions, configS): DynamicModule {
        return {
            module: RmqModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configS: any) => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: [configS.getRmqUri],
                                queue: configS.getRmqUsersQueue,
                            },
                        }),
                        inject: [configS],
                    },
                ]),
            ],
            exports: [ClientsModule],
        };
    }
}
