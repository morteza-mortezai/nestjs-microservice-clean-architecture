import { BadRequestException, ConflictException } from '@nestjs/common';
import { CreateUserUsecase } from './create-user.usecase';
import { IUserDataSource } from '../domain/data-source/user-data-source.interface';
import { IExceptionService } from '../domain/exceptions/exception-service.interface';
import { IMessageBrokerService } from '../domain/message-broker/message-broker.interface';

describe('Create User Usecase', () => {
    let userDataSource: IUserDataSource
    let exceptionService: IExceptionService
    let messageBroker: IMessageBrokerService
    let createUserUsecase: CreateUserUsecase
    const userDto = {
        email: 'a@fg7a.com',
        first_name: 'ali',
        last_name: 'alavi',
        password: '123',
        avatar: 'av'
    }
    beforeEach(async () => {

        userDataSource = {
            insert: jest.fn().mockImplementation(() => userDto),
            findByEmail: jest.fn().mockImplementation(() => false)
        }

        exceptionService = {
            badRequestException: jest.fn().mockImplementation(() => { throw new BadRequestException('////////'); }),
            conflictException: jest.fn().mockImplementation(() => true)
        } as unknown as IExceptionService

        messageBroker = {
            emitUserCreatedEvent: jest.fn().mockImplementation(() => true)
        } as unknown as IMessageBrokerService

        createUserUsecase = new CreateUserUsecase(userDataSource, exceptionService, messageBroker)
    });

    describe('should create user', () => {

        it('should create user', async () => {
            expect(await createUserUsecase.createUser(userDto)).toEqual(userDto);
        });
    })

    describe('call services', () => {

        it('call three services', async () => {
            await createUserUsecase.createUser(userDto)
            expect(userDataSource.findByEmail).toHaveBeenCalled()
            expect(userDataSource.insert).toHaveBeenCalled()
            expect(messageBroker.emitUserCreatedEvent).toHaveBeenCalled()
        });
    })


});
