import { IExternallApiService } from "../domain/external-api/externall-api.interface";

export class GetUserFromApiUsecase {
    constructor(
        private readonly externalApiService: IExternallApiService,
    ) { }
    async getUserFromApi(userId: number) {
        const user = await this.externalApiService.getUserById(userId)
        return user
    }
}