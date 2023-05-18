import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { UsecaseProxy } from '../usecase-proxy/usecase-proxy';
import { CreateUserUsecase } from '../../usecase/create-user.usecase';
import { GetUserFromApiUsecase } from '../../usecase/get-user-from-api.usecase';
import { GetUserAvatarUsecase } from '../../usecase/get-user-avatar.usecase';
import { DeleteAvatarUsecase } from '../../usecase/delete-avatar.usecase';
import { INestApplication } from '@nestjs/common';

describe('User Controller', () => {
    let app: INestApplication;
    let userController: UserController;
    let postUserUsecase: CreateUserUsecase
    let getUserFromApiUsecase: GetUserFromApiUsecase
    let getUserAvatarUsecase: GetUserAvatarUsecase
    let deleteAvatarUsecase: DeleteAvatarUsecase

    beforeAll(async () => {
        postUserUsecase = {} as CreateUserUsecase
        getUserFromApiUsecase = {} as GetUserFromApiUsecase
        getUserAvatarUsecase = {} as GetUserAvatarUsecase
        deleteAvatarUsecase = {} as DeleteAvatarUsecase

        const postUserUsecaseProxyService: UsecaseProxy<CreateUserUsecase> = {
            getInstance: () => postUserUsecase
        } as UsecaseProxy<CreateUserUsecase>;

        const getUserFromApiUsecaseProxyService: UsecaseProxy<GetUserFromApiUsecase> = {
            getInstance: () => getUserFromApiUsecase
        } as UsecaseProxy<GetUserFromApiUsecase>;

        const getUserAvatarUsecaseProxyService: UsecaseProxy<GetUserAvatarUsecase> = {
            getInstance: () => getUserAvatarUsecase
        } as UsecaseProxy<GetUserAvatarUsecase>;

        const deleteAvatarUsecaseProxyService: UsecaseProxy<DeleteAvatarUsecase> = {
            getInstance: () => deleteAvatarUsecase
        } as UsecaseProxy<DeleteAvatarUsecase>;

        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UsecaseProxyModule.POST_USER_USECASES_PROXY,
                    useValue: postUserUsecaseProxyService
                },
                {
                    provide: UsecaseProxyModule.Get_USER_FROM_API_USECASES_PROXY,
                    useValue: getUserFromApiUsecaseProxyService
                },
                {
                    provide: UsecaseProxyModule.Get_USER_AVATAR_USECASES_PROXY,
                    useValue: getUserAvatarUsecaseProxyService
                },
                {
                    provide: UsecaseProxyModule.Delete_USER_AVATAR_USECASES_PROXY,
                    useValue: deleteAvatarUsecaseProxyService
                },
            ]
        }).compile()

        app = moduleRef.createNestApplication();
        await app.init();

        userController = moduleRef.get<UserController>(UserController)
    });
    describe('create user', () => {
        it('should be defined', async () => {
            expect(userController.createUser).toBeDefined
        });
        it('should return created user', async () => {
            const userDto = {
                email: 'a@a.com',
                first_name: 'ali',
                last_name: 'alavi',
                password: '123',
                avatar: 'av'
            }
            postUserUsecase.createUser = jest.fn().mockResolvedValue(userDto)
            expect(userController.createUser(userDto)).resolves.toEqual(userDto)
        });
    })
    describe('get user by Id', () => {
        it('should be defined', async () => {
            expect(userController.getUserById).toBeDefined
        });
        it('should user', async () => {
            const userfromApi = {
                id: 1,
                email: 'george.bluth@reqres.in',
                first_name: 'George',
                last_name: 'Bluth',
                avatar: 'https://reqres.in/img/faces/1-image.jpg'
            }
            getUserFromApiUsecase.getUserFromApi = jest.fn().mockResolvedValue(userfromApi)
            expect(userController.getUserById(1)).resolves.toEqual(userfromApi)
        });

    })
    describe('get user avatar by Id', () => {
        it('should be defined', async () => {
            expect(userController.getAvatarByUserId).toBeDefined
        });
        it('should return user avatar', async () => {
            const avatarBase64 = 'some base64 string'
            getUserAvatarUsecase.getAvatar = jest.fn().mockResolvedValue(avatarBase64)
            expect(userController.getAvatarByUserId(1)).resolves.toEqual(avatarBase64)
        });

    })
    describe('delete user avatar by Id', () => {
        it('should be defined', async () => {
            expect(userController.getAvatarByUserId).toBeDefined
        });
        it('delete user avatar', async () => {
            const result = { message: 'avatar deleted successfully' }
            deleteAvatarUsecase.deleteAvatar = jest.fn().mockResolvedValue(result)
            expect(userController.deleteAvatar(1)).resolves.toEqual(result)
        });
    })
    afterAll(async () => {
        await app.close();
    });
});
