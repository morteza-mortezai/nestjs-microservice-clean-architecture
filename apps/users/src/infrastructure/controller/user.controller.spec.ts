import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { UsecaseProxy } from '../usecase-proxy/usecase-proxy';
import { CreateUserUsecase } from '../../usecase/createUser.usecase';
import { GetUserFromApiUsecase } from '../../usecase/getUserFromApi.usecase';
import { GetUserAvatarUsecase } from '../../usecase/getUserAvatar.usecase';
import { DeleteAvatarUsecase } from '../../usecase/delete-avatar.usecase';
import { ControllerModule } from './controller.module'
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module'
describe('User Controller', () => {
    let app: INestApplication;

    let userController: UserController;

    let postUserUsecase: CreateUserUsecase
    let getUserFromApiUsecase: GetUserFromApiUsecase
    let getUserAvatarUsecase: GetUserAvatarUsecase
    let deleteAvatarUsecase: DeleteAvatarUsecase
    // isolated test must be done
    beforeAll(async () => {
        postUserUsecase = {} as CreateUserUsecase
        postUserUsecase.createUser = jest.fn()

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

        const moduleRef = await Test.createTestingModule({
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
        })
            .compile()

        app = moduleRef.createNestApplication();
        await app.init();

        userController = moduleRef.get<UserController>(UserController)
    });
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
        postUserUsecase.createUser = jest.fn(() => Promise.resolve(userDto))
        expect(userController.createUser(userDto)).resolves.toEqual(userDto)
    });
    afterAll(async () => {
        await app.close();
    });
});
