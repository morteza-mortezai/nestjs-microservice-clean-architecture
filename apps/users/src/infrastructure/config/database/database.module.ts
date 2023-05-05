import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database.config';

@Module({
    imports: [

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
        })
    ],
    providers: [TypeOrmConfigService]
})
export class DatabaseModule { }
