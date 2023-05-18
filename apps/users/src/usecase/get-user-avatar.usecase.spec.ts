import { Test, TestingModule } from '@nestjs/testing';
import { UsecaseProxyModule } from '../infrastructure/usecase-proxy/usecase-proxy.module';
import { INestApplication } from '@nestjs/common';
import { ExceptionsService } from '@app/common/exceptions/exceptions.service';
import { GetUserAvatarUsecase } from './get-user-avatar.usecase';
import { IAvatarDataSource } from '../domain/data-source/avatar-data-source.interface';
import { IExternallApiService } from '../domain/external-api/externall-api.interface';
import { IHashService } from '../domain/hash-service/hash-service.interface';
import { IDiskStorageAvatar } from '../domain/disk-storage-avatar/disk-storage-avatar.interface';
describe('User Controller', () => {
    let app: INestApplication;
    let getUserAvatarUsecase: GetUserAvatarUsecase

    let avatarDataSource: IAvatarDataSource
    let externallApiService: IExternallApiService
    let hashService: IHashService
    let diskStorageAvatarService: IDiskStorageAvatar

    const userFromApi = {
        id: 1,
        email: 'george.bluth@reqres.in',
        first_name: 'George',
        last_name: 'Bluth',
        avatar: 'https://reqres.in/img/faces/1-image.jpg'
    }

    beforeAll(async () => {
        avatarDataSource = {} as IAvatarDataSource
        externallApiService = {} as IExternallApiService
        hashService = {} as IHashService
        diskStorageAvatarService = {} as IDiskStorageAvatar

        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: UsecaseProxyModule.Get_USER_AVATAR_USECASES_PROXY,
                    useValue: new GetUserAvatarUsecase(avatarDataSource, new ExceptionsService(), externallApiService, hashService, diskStorageAvatarService)
                }
            ]
        }).compile()

        app = moduleRef.createNestApplication();
        await app.init();

        getUserAvatarUsecase = moduleRef.get<GetUserAvatarUsecase>(UsecaseProxyModule.Get_USER_AVATAR_USECASES_PROXY)
    });
    it('should be defined', async () => {
        expect(getUserAvatarUsecase.getAvatar).toBeDefined
    });
    it('return base-64 avatar from local storage', async () => {
        const avatarBase64 = 'some base64 string'
        avatarDataSource.findAvatarByUserId = jest.fn().mockResolvedValue({ hashedName: 'some avatar hashed name' })
        diskStorageAvatarService.checkAvatarFileExists = jest.fn().mockResolvedValue(true)
        diskStorageAvatarService.readAvatarBase64 = jest.fn().mockResolvedValue(avatarBase64)
        const result = await getUserAvatarUsecase.getAvatar(1)
        expect(result).toEqual(avatarBase64)
    });
    it('download avatar and save then send it to user', async () => {
        const avatarBase64 = 'some base64 string'
        avatarDataSource.findAvatarByUserId = jest.fn().mockResolvedValue(null)
        diskStorageAvatarService.readAvatarBase64 = jest.fn().mockResolvedValue(avatarBase64)
        externallApiService.getUserById = jest.fn().mockResolvedValue(userFromApi)
        hashService.generateHashForName = jest.fn().mockResolvedValue('some hashed name')
        externallApiService.downloadAndSaveAvatar = jest.fn()
        avatarDataSource.insertAvatar = jest.fn()
        const result = await getUserAvatarUsecase.getAvatar(1)
        expect(result).toEqual(avatarBase64)
    });
    it('throw an error when user has no avatar', async () => {
        const avatarBase64 = 'some base64 string'
        avatarDataSource.findAvatarByUserId = jest.fn().mockResolvedValue(null)
        diskStorageAvatarService.readAvatarBase64 = jest.fn().mockResolvedValue(avatarBase64)
        userFromApi.avatar = ''
        externallApiService.getUserById = jest.fn().mockResolvedValue(userFromApi)
        expect(getUserAvatarUsecase.getAvatar(1)).rejects.toThrowError()
    });
    afterAll(async () => {
        await app.close();
    });
});
