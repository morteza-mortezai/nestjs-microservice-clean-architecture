import { IExceptionService } from "../domain/exceptions/exception-service.interface";
import { IExternallApiService } from "../domain/external-api/externall-api.interface";
import { IAvatarDataSource } from "../domain/repository/avatarDataSource.interface";
import { IHashService } from "../domain/hash-service/hash-service.interface";
import { IDiskStorageAvatar } from "../domain/disk-storage-avatar/disk-storage-avatar.interface";

export class GetUserAvatarUsecase {
    constructor(
        private readonly avatarDataSource: IAvatarDataSource,
        private readonly exceptionService: IExceptionService,
        private readonly externalApiService: IExternallApiService,
        private readonly hashService: IHashService,
        private readonly diskStorageAvatar: IDiskStorageAvatar,
    ) { }

    private _sendAvatar(hashedName: string) {
        return this.diskStorageAvatar.readAvatarBase64(hashedName)
    }

    async getAvatar(userId: number) {

        // Search in db
        const avatarRecord = await this.avatarDataSource.findAvatarByUserId(userId)
        // Exist
        if (avatarRecord && avatarRecord.hashedName) {
            const avatarFileExist = await this.diskStorageAvatar.checkAvatarFileExists(avatarRecord.hashedName)
            if (avatarFileExist) return this._sendAvatar(avatarRecord.hashedName)
        }

        // Dosn't Exist
        const user = await this.externalApiService.getUserById(userId)
        if (!user.avatar) {
            this.exceptionService.badRequestException({ message: 'this user has no avatar' })
        }
        const hashedName = await this.hashService.generateHashForName(userId, 10)
        await this.externalApiService.downloadAndSaveAvatar(user.avatar, hashedName)
        await this.avatarDataSource.insertAvatar({ userId, hashedName })

        return this._sendAvatar(hashedName)
    }

}