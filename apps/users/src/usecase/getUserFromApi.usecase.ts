import { IExceptionService } from "../domain/exceptions/exception-service.interface";
import { IExternallApiService } from "../domain/external-api/externall-api.interface";

export class GetUserFromApiUsecase {
    constructor(
        private readonly externalApiService: IExternallApiService,
        private readonly exceptionService: IExceptionService
    ) { }

    async getUserFromApi(userId: number) {
        // return new ForbiddenException('000000000')
        // return this.exceptionService.badRequestException({ message: 'my |||| error getting user', code_error: 400 })
        // try {
        const user = await this.externalApiService.getUserById(userId)
        return user
        // } catch (error) {
        //     // console.log('this is usecase', error)
        //     throw this.exceptionService.badRequestException({ message: 'error getting user', code_error: 400 })
        // }
    }
}