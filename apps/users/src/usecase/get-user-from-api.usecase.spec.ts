import { Test, TestingModule } from '@nestjs/testing';
import { UsecaseProxyModule } from '../infrastructure/usecase-proxy/usecase-proxy.module';
import { INestApplication } from '@nestjs/common';
import { GetUserFromApiUsecase } from './get-user-from-api.usecase';
import { IExternallApiService } from '../domain/external-api/externall-api.interface';
describe('User Controller', () => {
    let app: INestApplication;
    let getUserFromApiUsecase: GetUserFromApiUsecase
    let externallApiService: IExternallApiService

    const userFromApi = {
        id: 1,
        email: 'george.bluth@reqres.in',
        first_name: 'George',
        last_name: 'Bluth',
        avatar: 'https://reqres.in/img/faces/1-image.jpg'
    }
    beforeAll(async () => {
        externallApiService = {} as IExternallApiService
        externallApiService.getUserById = jest.fn().mockResolvedValue(userFromApi)

        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: UsecaseProxyModule.Get_USER_FROM_API_USECASES_PROXY,
                    useValue: new GetUserFromApiUsecase(externallApiService)
                }
            ]
        }).compile()

        app = moduleRef.createNestApplication();
        await app.init();

        getUserFromApiUsecase = moduleRef.get<GetUserFromApiUsecase>(UsecaseProxyModule.Get_USER_FROM_API_USECASES_PROXY)
    });
    it('should be defined', async () => {
        expect(getUserFromApiUsecase.getUserFromApi).toBeDefined
    });
    it('return return user', async () => {
        const res = await getUserFromApiUsecase.getUserFromApi(1)
        expect(res).toEqual(userFromApi)
        expect(externallApiService.getUserById).toHaveBeenCalled()
    });
    afterAll(async () => {
        await app.close();
    });
});
