import { Test, TestingModule } from '@nestjs/testing';
import { UsecaseProxyModule } from '../infrastructure/usecase-proxy/usecase-proxy.module';
import { INestApplication } from '@nestjs/common';
import { ExceptionsService } from '@app/common/exceptions/exceptions.service';
import { IAvatarDataSource } from '../domain/data-source/avatar-data-source.interface';
import { IExternallApiService } from '../domain/external-api/externall-api.interface';
import { IDiskStorageAvatar } from '../domain/disk-storage-avatar/disk-storage-avatar.interface';
import { DeleteAvatarUsecase } from './delete-avatar.usecase';
describe('User Controller', () => {
    let app: INestApplication;
    let deleteAvatarUsecase: DeleteAvatarUsecase

    let avatarDataSource: IAvatarDataSource
    let externallApiService: IExternallApiService
    let diskStorageAvatarService: IDiskStorageAvatar

    beforeAll(async () => {
        avatarDataSource = {} as IAvatarDataSource
        externallApiService = {} as IExternallApiService
        diskStorageAvatarService = {} as IDiskStorageAvatar

        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: UsecaseProxyModule.Delete_USER_AVATAR_USECASES_PROXY,
                    useValue: new DeleteAvatarUsecase(avatarDataSource, diskStorageAvatarService, new ExceptionsService())
                }
            ]
        }).compile()

        app = moduleRef.createNestApplication();
        await app.init();

        deleteAvatarUsecase = moduleRef.get<DeleteAvatarUsecase>(UsecaseProxyModule.Delete_USER_AVATAR_USECASES_PROXY)
    });
    it('should be defined', async () => {
        expect(deleteAvatarUsecase.deleteAvatar).toBeDefined
    });
    it('delete saved avatar from local storage', async () => {
        const message = { message: 'avatar deleted successfully' }
        avatarDataSource.findAvatarByUserId = jest.fn().mockResolvedValue({ hashedName: 'some avatar hashed name' })
        avatarDataSource.deleteAvatar = jest.fn()
        diskStorageAvatarService.deleteAvatarFile = jest.fn()

        const result = await deleteAvatarUsecase.deleteAvatar(1)
        expect(result).toEqual(message)
    });
    it('throw an error when there isnt avatar', async () => {
        avatarDataSource.findAvatarByUserId = jest.fn().mockResolvedValue(null)
        expect(deleteAvatarUsecase.deleteAvatar(1)).rejects.toThrowError()
    });
    afterAll(async () => {
        await app.close();
    });
});
