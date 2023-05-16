import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../infrastructure/controller/user.controller';
import { UsecaseProxyModule } from '../infrastructure/usecase-proxy/usecase-proxy.module';
import { UsecaseProxy } from '../infrastructure/usecase-proxy/usecase-proxy';
import { CreateUserUsecase } from '../usecase/createUser.usecase';
import { GetUserFromApiUsecase } from '../usecase/getUserFromApi.usecase';
import { GetUserAvatarUsecase } from '../usecase/getUserAvatar.usecase';
import { DeleteAvatarUsecase } from '../usecase/delete-avatar.usecase';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module'
import { IUserDataSource } from '../domain/repository/userDataSource.interface';
import { IExceptionService } from '../domain/exceptions/exception-service.interface';
import { IMessageBrokerService } from '../domain/message-broker/message-broker.interface';
import { UserDataSource } from '../infrastructure/data-source/user.data-source';
import { ExceptionsService } from '@app/common/exceptions/exceptions.service';
import { MessageBrokerService } from '../infrastructure/message-broker/message-broker.service';
describe('User Controller', () => {
    let app: INestApplication;
    let createUserUsecase: CreateUserUsecase

    let userDataSource: IUserDataSource
    let exceptionService: IExceptionService
    let messageBroker: IMessageBrokerService
    // let usecaseProxyModule: UsecaseProxyModule;
    // let getUserFromApiUsecase: GetUserFromApiUsecase
    // let getUserAvatarUsecase: GetUserAvatarUsecase
    // let deleteAvatarUsecase: DeleteAvatarUsecase
    // isolated test must be done
    const userDto = {
        email: 'a@a.com',
        first_name: 'ali',
        last_name: 'alavi',
        password: '123',
        avatar: 'av'
    }
    beforeAll(async () => {
        // postUserUsecase = {} as CreateUserUsecase
        // postUserUsecase.createUser = jest.fn()
        userDataSource = {
            findByEmail: jest.fn(() => Promise.resolve(userDto)),
            insert: jest.fn()
        }
        exceptionService = {} as IExceptionService
        messageBroker = {} as IMessageBrokerService
        // const postUserUsecaseProxyService: UsecaseProxy<CreateUserUsecase> = {
        //     getInstance: () => postUserUsecase
        // } as UsecaseProxy<CreateUserUsecase>;

        // const getUserFromApiUsecaseProxyService: UsecaseProxy<GetUserFromApiUsecase> = {
        //     getInstance: () => getUserFromApiUsecase
        // } as UsecaseProxy<GetUserFromApiUsecase>;

        // const getUserAvatarUsecaseProxyService: UsecaseProxy<GetUserAvatarUsecase> = {
        //     getInstance: () => getUserAvatarUsecase
        // } as UsecaseProxy<GetUserAvatarUsecase>;

        // const deleteAvatarUsecaseProxyService: UsecaseProxy<DeleteAvatarUsecase> = {
        //     getInstance: () => deleteAvatarUsecase
        // } as UsecaseProxy<DeleteAvatarUsecase>;

        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: UsecaseProxyModule.POST_USER_USECASES_PROXY,
                    useValue: new CreateUserUsecase(userDataSource, exceptionService, messageBroker)
                }
            ]
        })
            // .overrideProvider(userDataSource)
            // .useValue(userDataSource)
            .compile()

        app = moduleRef.createNestApplication();
        await app.init();

        createUserUsecase = moduleRef.get<CreateUserUsecase>(UsecaseProxyModule.POST_USER_USECASES_PROXY)
    });
    it('should be defined', async () => {
        expect(createUserUsecase.createUser).toBeDefined
    });
    it('return created user', async () => {

        expect(await createUserUsecase.createUser(userDto)).toEqual(userDto)
    });
    // it('should return created user', async () => {
    //     const userDto = {
    //         email: 'a@a.com',
    //         first_name: 'ali',
    //         last_name: 'alavi',
    //         password: '123',
    //         avatar: 'av'
    //     }
    //     postUserUsecase.createUser = jest.fn(() => Promise.resolve(userDto))
    //     expect(await userController.createUser(userDto)).toEqual(userDto)
    // });
    afterAll(async () => {
        await app.close();
    });
});
