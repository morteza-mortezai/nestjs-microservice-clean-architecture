import { Test } from '@nestjs/testing';
import { UsecaseProxyModule } from '../infrastructure/usecase-proxy/usecase-proxy.module';
import { CreateUserUsecase } from '../usecase/createUser.usecase';
import { ConflictException, INestApplication } from '@nestjs/common';
import { IUserDataSource } from '../domain/repository/userDataSource.interface';
import { IMessageBrokerService } from '../domain/message-broker/message-broker.interface';
import { ExceptionsService } from '@app/common/exceptions/exceptions.service';
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

        const moduleRef = await Test.createTestingModule({
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
        expect(await createUserUsecase.createUser(userDto)).toEqual(userDto)
    });
    it('return error', async () => {
        jest.spyOn(userDataSource, 'findByEmail').mockImplementation(() => Promise.resolve(userDto))
        expect(createUserUsecase.createUser(userDto)).rejects.toThrow(ConflictException)
    });
    afterAll(async () => {
        await app.close();
    });
});
