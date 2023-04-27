import { IExceptionService } from "../domain/exceptions/exception-service.interface";
import { UserM } from "../domain/model/user";
import { UserRepository } from "../domain/repository/userRepository.interface";
import { IExternallApiService } from "../domain/external-api/externall-api.interface";
import { AvatarRepository } from "../domain/repository/avatarRepository.interface";
import { IHashService } from "../domain/hash-service/hash-service.interface";
import { IDiskStorageAvatar } from "../domain/disk-storage-avatar/disk-storage-avatar.interface";

export class GetUserAvatarUsecase {
    constructor(
        private readonly avatarRepository: AvatarRepository,
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
        const avatarRecord = await this.avatarRepository.findByUserId(userId)
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
        await this.avatarRepository.insertAvatar({ userId, hashedName })

        return this._sendAvatar(hashedName)
    }

}