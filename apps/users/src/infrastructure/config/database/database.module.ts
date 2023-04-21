import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from '../../environment/environment.module';
import { TypeOrmConfigService } from './database.config';

@Module({
    imports: [
        EnvironmentModule,
        // TypeOrmModule.forRootAsync({
        //     imports: [EnvironmentModule],
        //     useFactory: (environment: EnvironmentService) => ({
        //         type: 'postgres',
        //         host: environment.getDatabaseHost(),
        //         port: environment.getDatabasePort(),
        //         username: environment.getDatabaseUser(),
        //         password: environment.getDatabasePassword(),
        //         database: environment.getDatabaseName(),
        //         // entities: [User],
        //         autoLoadEntities: true,
        //         synchronize: environment.getDatabaseSynchronize(),
        //     }),
        //     inject: [EnvironmentService]
        // }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            imports: [EnvironmentModule]
        })
    ],
    providers: [TypeOrmConfigService]
})
export class DatabaseModule { }
