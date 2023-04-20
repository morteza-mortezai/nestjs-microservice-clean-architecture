import { Module, DynamicModule } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ConfigurableModuleClass } from './config.module-definition';

interface RmqModuleOptions {
    name: string;
}

@Module({
    providers: [RmqService],
    exports: [RmqService]
})
export class RmqModule {
    static register({ name }: RmqModuleOptions): DynamicModule {
        return {
            module: RmqModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        // اینحا رو میشد بدون فکتوری هم نوشت
                        useFactory: (configService: ConfigService) => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: [configService.get<string>('RMQ_URI')],
                                queue: configService.get<string>(`RMQ_${name}_QUEUE`),
                            },
                        }),
                        inject: [ConfigService],
                    },
                ]),
            ],
            exports: [ClientsModule],
        };
    }
}


// export class RmqModule extends ConfigurableModuleClass { }