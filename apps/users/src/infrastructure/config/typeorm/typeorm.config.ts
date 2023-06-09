import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvironmentService } from '../environment/environment.service';
import { join } from 'path';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
    constructor(
        private environmentService: EnvironmentService
    ) { }
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mongodb',
            url: this.environmentService.getMongoDbUri(),
            entities: [join(__dirname, '**/**.entity{.ts,.js}')],
            autoLoadEntities: true,
            synchronize: true,
            useNewUrlParser: true,
        };
    }
}

