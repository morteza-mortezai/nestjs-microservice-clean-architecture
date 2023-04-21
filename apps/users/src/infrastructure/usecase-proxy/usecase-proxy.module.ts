import { DynamicModule, Module } from '@nestjs/common';
import { UserRepositoryModule } from '../repository/userRepository.module';
import { addUserUsecase } from '../../usecase/addUser.usecase'
// import { DatabaseUserRepository } from 'src/infrastructure/repository/user.repository'
import { UsecaseProxy } from './usecase-proxy'
import { ExceptionsService } from '../exceptions/exceptions.service';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExternallApiModule } from '../external-api/externall-api.module'
import { ExternallApiService } from '../external-api/externall-api.service';
import { GetUserFromApiUsecase } from '../../usecase/getUserFromApi.usecase'
@Module({
    imports: [
        UserRepositoryModule, ExceptionsModule, ExternallApiModule
    ]
})
export class UsecaseProxyModule {
    static POST_USER_USECASES_PROXY = 'postUserUsecasesProxy';
    static Get_USER_FROM_API_USECASES_PROXY = 'postUserUsecasesProxy';
    static register(): DynamicModule {
        return {
            module: UsecaseProxyModule,
            providers: [
                // {
                //     inject: [DatabaseUserRepository, ExceptionsService],
                //     provide: UsecaseProxyModule.POST_USER_USECASES_PROXY,
                //     useFactory: (databaseUserRepository: DatabaseUserRepository, exceptionsService: ExceptionsService) => new UsecaseProxy(new addUserUsecase(databaseUserRepository, exceptionsService))
                // },
                {
                    inject: [ExternallApiService, ExceptionsService],
                    provide: UsecaseProxyModule.Get_USER_FROM_API_USECASES_PROXY,
                    useFactory: (externalApiService: ExternallApiService, exceptionsService: ExceptionsService) => new UsecaseProxy(new GetUserFromApiUsecase(externalApiService, exceptionsService))
                }
            ],
            exports: [
                UsecaseProxyModule.POST_USER_USECASES_PROXY
            ]
        }
    }
}