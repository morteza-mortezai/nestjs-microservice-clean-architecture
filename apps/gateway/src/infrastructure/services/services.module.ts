import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { RmqModule } from '@app/common';
import { RMQ_SERVICE } from '../constants/rmq.constants';
// import { EnvironmentModule } from '../environment/environment.module';
// import { EnvironmentService } from '../environment/environment.service';
//
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
    imports: [
        RmqModule.register({ name: 'BILLING' }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/gateway/env/local.env'
        })
    ],
    // imports: [
    //     RmqModule.registerAsync({
    //         imports: [
    //             ClientsModule.registerAsync([
    //                 {
    //                     name: RMQ_SERVICE.USERS,
    //                     useFactory: () => ({
    //                         transport: Transport.RMQ,
    //                         options: {
    //                             urls: ['amqp://localhost:5672'],
    //                             queue: 'users',
    //                         },
    //                     }),
    //                     inject: [],
    //                 },
    //             ]),

    //         ],

    //     }),

    // ],
    controllers: [],
    providers: [UserService],
    exports: [UserService]
})
export class ServicesModule { }
// imports: [
//     ClientsModule.registerAsync([
//         {
//             name,
//             useFactory: (EnvironmentService) => ({
//                 transport: Transport.RMQ,
//                 options: {
//                     urls: [EnvironmentService.getRmqUri],
//                     queue: EnvironmentService.getRmqUsersQueue,
//                 },
//             }),
//             inject: [EnvironmentService],
//         },
//     ]),
// ],