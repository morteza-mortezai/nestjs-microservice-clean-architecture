import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqConfig } from '../../../domain/environment/rmq.interface';
import { AppConfig } from '../../../domain/environment/app.interface';
import { HttpConfig } from '../../../domain/environment/http.interface';
import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class EnvironmentService implements RmqConfig, AppConfig, HttpConfig {
    constructor(private configService: ConfigService) { }
    // onModuleInit() {
    //     console.log(`----`, this.configService.get<string>('DB_HOST'));
    // }

    private _getRmqUri(): string {
        return this.configService.get<string>('RMQ_URI');
    }

    private _getQueue(name: string): string {
        return this.configService.get<string>(`RMQ_${name}_QUEUE`);
    }

    getAppPort(): number {
        return this.configService.get<number>('APP_PORT');
    }

    getHttpTimeout(): number {
        return this.configService.get<number>('HTTP_TIMEOUT');
    }

    getHttpMaxRedirects(): number {
        return this.configService.get<number>('HTTP_MAX_REDIRECTS');
    }

    getMongoDbUri(): string {
        return this.configService.get<string>('MONGODB_URI');
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

}
