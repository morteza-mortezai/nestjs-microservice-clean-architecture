import { Test, TestingModule } from '@nestjs/testing';
import { UsecaseProxyModule } from '../infrastructure/usecase-proxy/usecase-proxy.module';
import { CreateUserUsecase } from '../usecase/create-user.usecase';
import { ConflictException, INestApplication } from '@nestjs/common';
import { IUserDataSource } from '../domain/data-source/user-data-source.interface';
import { IMessageBrokerService } from '../domain/message-broker/message-broker.interface';
import { ExceptionsService } from '../infrastructure/exceptions/exceptions.service';
describe('User Controller', () => {
    let app: INestApplication;
    let createUserUsecase: CreateUserUsecase

    let userDataSource: IUserDataSource
    let messageBroker: IMessageBrokerService
    const userDto = {
        email: 'a@a.com',
        first_name: 'ali',
        last_name: 'alavi',
        password: '123',
        avatar: 'av'
    }
    beforeAll(async () => {
        userDataSource = {
            findByEmail: jest.fn(() => Promise.resolve(null)),
            insert: jest.fn(() => Promise.resolve(userDto))
        }
        messageBroker = {} as IMessageBrokerService
        messageBroker.emitUserCreatedEvent = jest.fn().mockResolvedValue(() => null)

        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: UsecaseProxyModule.POST_USER_USECASES_PROXY,
                    useValue: new CreateUserUsecase(userDataSource, new ExceptionsService(), messageBroker)
                }
            ]
        }).compile()

        app = moduleRef.createNestApplication();
        await app.init();

        createUserUsecase = moduleRef.get<CreateUserUsecase>(UsecaseProxyModule.POST_USER_USECASES_PROXY)
    });
    it('should be defined', async () => {
        expect(createUserUsecase.createUser).toBeDefined
    });
    it('return created user', async () => {
        const res = await createUserUsecase.createUser(userDto)
        expect(res).toEqual(userDto)
        expect(userDataSource.findByEmail).toHaveBeenCalled()
        expect(userDataSource.insert).toHaveBeenCalled()
        expect(messageBroker.emitUserCreatedEvent).toHaveBeenCalled()
    });

    afterAll(async () => {
        await app.close();
    });
});
