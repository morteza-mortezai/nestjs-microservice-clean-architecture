import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqConfig } from '../../domain/environment/rmq.interface';
import { AppConfig } from '../../domain/environment/app.interface';
import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class EnvironmentService implements RmqConfig, AppConfig {
    constructor(private configService: ConfigService) { }

    getAppPort(): number {
        return this.configService.get<number>('APP_PORT');
    }

    getRabbitMQOptions(name: string, noAck = false): ClientOptions {
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

    private _getQueue(name: string): string {
        return this.configService.get<string>(`RMQ_${name}_QUEUE`);
    }

    private _getRmqUri(): string {
        return this.configService.get<string>('RMQ_URI');
    }
}
