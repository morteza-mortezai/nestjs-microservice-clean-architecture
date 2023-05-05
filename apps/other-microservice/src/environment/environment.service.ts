import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqConfig } from '../interface/rmq.interface';
import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class EnvironmentService implements RmqConfig {
    constructor(private configService: ConfigService) { }

    private _getRmqUri(): string {
        return this.configService.get<string>('RMQ_URI');
    }

    private _getQueue(name: string): string {
        return this.configService.get<string>(`RMQ_${name}_QUEUE`);
    }

    getRabbitMQOptions(name: string, noAck = true): ClientOptions {
        const clientOptions: ClientOptions = {
            transport: Transport.RMQ,
            options: {
                urls: [this._getRmqUri()],
                queue: this._getQueue(name),
                persistent: true,
                noAck
            }
        }
        return clientOptions
    }
}
