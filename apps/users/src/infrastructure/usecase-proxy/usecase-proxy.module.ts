import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repository/repositories.module';
import { addUserUsecase } from '../../usecase/addUser.usecase'
import { DatabaseUserRepository } from '../../infrastructure/repository/user.repository'
import { UsecaseProxy } from './usecase-proxy'
import { ExceptionsService } from '../exceptions/exceptions.service';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExternallApiModule } from '../external-api/externall-api.module'
import { ExternallApiService } from '../external-api/externall-api.service';
import { GetUserFromApiUsecase } from '../../usecase/getUserFromApi.usecase'
import { GetUserAvatarUsecase } from '../../usecase/getUserAvatar.usecase'
import { DatabaseAvatarRepository } from '../repository/avatar.repository';
@Module({
    imports: [
        RepositoriesModule, ExceptionsModule, ExternallApiModule
    ]
})
export class UsecaseProxyModule {
    static POST_USER_USECASES_PROXY = 'postUserUsecasesProxy';
    static Get_USER_FROM_API_USECASES_PROXY = 'getUserFromExternallApiUsecasesProxy';
    static Get_USER_AVATAR_USECASES_PROXY = 'getUserAvatarUsecasesProxy';
    static register(): DynamicModule {
        return {
            module: UsecaseProxyModule,
            providers: [
                {
                    inject: [DatabaseUserRepository, ExceptionsService],
                    provide: UsecaseProxyModule.POST_USER_USECASES_PROXY,
                    useFactory: (databaseUserRepository: DatabaseUserRepository, exceptionsService: ExceptionsService) => new UsecaseProxy(new addUserUsecase(databaseUserRepository, exceptionsService))
                },
                {
                    inject: [ExternallApiService, ExceptionsService],
                    provide: UsecaseProxyModule.Get_USER_FROM_API_USECASES_PROXY,
                    useFactory: (externalApiService: ExternallApiService, exceptionsService: ExceptionsService) => new UsecaseProxy(new GetUserFromApiUsecase(externalApiService, exceptionsService))
                },
                {
                    inject: [DatabaseAvatarRepository, DatabaseUserRepository, ExternallApiService, ExceptionsService],
                    provide: UsecaseProxyModule.Get_USER_AVATAR_USECASES_PROXY,
                    useFactory: (databaseAvatarRepository: DatabaseAvatarRepository, databaseUserRepository: DatabaseUserRepository, externalApiService: ExternallApiService, exceptionsService: ExceptionsService) => new UsecaseProxy(new GetUserAvatarUsecase(databaseAvatarRepository, databaseUserRepository, exceptionsService, externalApiService))
                },
            ],
            exports: [
                UsecaseProxyModule.POST_USER_USECASES_PROXY,
                UsecaseProxyModule.Get_USER_FROM_API_USECASES_PROXY,
                UsecaseProxyModule.Get_USER_AVATAR_USECASES_PROXY
            ]
        }
    }
}