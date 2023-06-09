import { DynamicModule, Module } from '@nestjs/common';
import { DataSourceModule } from '../data-source/data-source.module';
import { CreateUserUsecase } from '../../usecase/create-user.usecase'
import { UserDataSource } from '../data-source/user.data-source'
import { UsecaseProxy } from './usecase-proxy'
import { ExceptionsService } from '../exceptions/exceptions.service';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExternallApiModule } from '../external-api/externall-api.module'
import { ExternallApiService } from '../external-api/externall-api.service';
import { GetUserFromApiUsecase } from '../../usecase/get-user-from-api.usecase'
import { GetUserAvatarUsecase } from '../../usecase/get-user-avatar.usecase'
import { DeleteAvatarUsecase } from '../../usecase/delete-avatar.usecase'
import { AvatarDataSource } from '../data-source/avatar.data-source';
import { HashModule } from '../hash/hash.module';
import { HashService } from '../hash/hash.service';
import { DiskStorageAvatarModule } from '../disk-storage-avatar/disk-storage-avatar.module';
import { DiskStorageAvatarService } from '../disk-storage-avatar/disk-storage-avatar.service';
import { MessageBrokerService } from '../message-broker/message-broker.service';
import { MessageBrokerModule } from '../message-broker/message-broker.module';

@Module({
    imports: [
        DataSourceModule, ExceptionsModule, ExternallApiModule, HashModule, DiskStorageAvatarModule, MessageBrokerModule
    ]
})
export class UsecaseProxyModule {
    static POST_USER_USECASES_PROXY = 'postUserUsecasesProxy';
    static Get_USER_FROM_API_USECASES_PROXY = 'getUserFromExternallApiUsecasesProxy';
    static Get_USER_AVATAR_USECASES_PROXY = 'getUserAvatarUsecasesProxy';
    static Delete_USER_AVATAR_USECASES_PROXY = 'deleteUserAvatarUsecasesProxy';
    static register(): DynamicModule {
        return {
            module: UsecaseProxyModule,
            providers: [
                {
                    inject: [UserDataSource, ExceptionsService, MessageBrokerService],
                    provide: UsecaseProxyModule.POST_USER_USECASES_PROXY,
                    useFactory: (UserDataSource: UserDataSource, exceptionsService: ExceptionsService, messageBrokerService: MessageBrokerService) => new UsecaseProxy(new CreateUserUsecase(UserDataSource, exceptionsService, messageBrokerService))
                },
                {
                    inject: [ExternallApiService],
                    provide: UsecaseProxyModule.Get_USER_FROM_API_USECASES_PROXY,
                    useFactory: (externalApiService: ExternallApiService) => new UsecaseProxy(new GetUserFromApiUsecase(externalApiService))
                },
                {
                    inject: [AvatarDataSource, ExternallApiService, ExceptionsService, HashService, DiskStorageAvatarService],
                    provide: UsecaseProxyModule.Get_USER_AVATAR_USECASES_PROXY,
                    useFactory: (AvatarDataSource: AvatarDataSource, externalApiService: ExternallApiService, exceptionsService: ExceptionsService, hashService: HashService, diskStorageAvatarService: DiskStorageAvatarService) => new UsecaseProxy(new GetUserAvatarUsecase(AvatarDataSource, exceptionsService, externalApiService, hashService, diskStorageAvatarService))
                },
                {
                    inject: [AvatarDataSource, DiskStorageAvatarService, ExceptionsService],
                    provide: UsecaseProxyModule.Delete_USER_AVATAR_USECASES_PROXY,
                    useFactory: (AvatarDataSource: AvatarDataSource, diskStorageAvatarService: DiskStorageAvatarService, exceptionsService: ExceptionsService) => new UsecaseProxy(new DeleteAvatarUsecase(AvatarDataSource, diskStorageAvatarService, exceptionsService))
                },
            ],
            exports: [
                UsecaseProxyModule.POST_USER_USECASES_PROXY,
                UsecaseProxyModule.Get_USER_FROM_API_USECASES_PROXY,
                UsecaseProxyModule.Get_USER_AVATAR_USECASES_PROXY,
                UsecaseProxyModule.Delete_USER_AVATAR_USECASES_PROXY
            ]
        }
    }
}