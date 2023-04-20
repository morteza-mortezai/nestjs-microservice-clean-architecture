import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(
        private environment: EnvironmentService
    ) { }
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.environment.getDatabaseHost(),
            port: this.environment.getDatabasePort(),
            username: this.environment.getDatabaseUser(),
            password: this.environment.getDatabasePassword(),
            database: this.environment.getDatabaseName(),
            // entities: [User],
            autoLoadEntities: true,
            synchronize: this.environment.getDatabaseSynchronize(),
        };
    }
}