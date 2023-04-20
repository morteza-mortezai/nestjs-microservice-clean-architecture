import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/environment/database.interface';

@Injectable()
export class EnvironmentService implements DatabaseConfig {
    constructor(private configService: ConfigService) { }

    getDatabaseHost(): string {
        return this.configService.get<string>('DB_HOST');
    }

    getDatabasePort(): number {
        return this.configService.get<number>('DB_PORT');
    }

    getDatabaseUser(): string {
        return this.configService.get<string>('DB_USERNAME');
    }

    getDatabasePassword(): string {
        return this.configService.get<string>('DB_PASSWORD');
    }

    getDatabaseName(): string {
        return this.configService.get<string>('DB_NAME');
    }

    getDatabaseSynchronize(): boolean {
        return this.configService.get<boolean>('DB_SYNCHRONIZE')
    }
}
