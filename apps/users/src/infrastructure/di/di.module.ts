import { DynamicModule, Module } from '@nestjs/common';
import { UserRepositoryModule } from '../repository/userRepository.module';
import { addUserUsecase } from 'src/usecase/addUser.usecase'
import { DatabaseUserRepository } from 'src/infrastructure/repository/user.repository'
import { DiProxy } from './di'
import { ExceptionsService } from '../exceptions/exceptions.service';
import { ExceptionsModule } from '../exceptions/exceptions.module';
@Module({
    imports: [
        UserRepositoryModule, ExceptionsModule
    ]
})
export class diModule {
    static POST_USER_USECASES_PROXY = 'postUserUsecasesProxy';
    static register(): DynamicModule {
        return {
            module: diModule,
            providers: [
                {
                    inject: [DatabaseUserRepository, ExceptionsService],
                    provide: diModule.POST_USER_USECASES_PROXY,
                    useFactory: (databaseUserRepository: DatabaseUserRepository, exceptionsService: ExceptionsService) => new DiProxy(new addUserUsecase(databaseUserRepository, exceptionsService))
                }
            ],
            exports: [
                diModule.POST_USER_USECASES_PROXY
            ]
        }
    }
}