import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqConfig } from '../domain/environment/rmq.interface';
import { AppConfig } from '../domain/environment/app.interface';

@Injectable()
export class EnvironmentService implements RmqConfig, AppConfig {
    constructor(private configService: ConfigService) { }
    onModuleInit() {
        console.log(`----`, this.configService.get<string>('DB_HOST'));
    }

    getRmqUri(): string {
        return this.configService.get<string>('DB_HOST');
    }

    getRmqUsersQueue(): string {
        return this.configService.get<string>('DB_USERNAME');
    }

    getAppPort(): number {
        return this.configService.get<number>('APP_PORT');
    }

}
