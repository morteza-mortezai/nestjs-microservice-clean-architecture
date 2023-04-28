import { IExceptionService } from "../domain/exceptions/exception-service.interface";
import { AvatarRepository } from "../domain/repository/avatarRepository.interface";
import { IDiskStorageAvatar } from "../domain/disk-storage-avatar/disk-storage-avatar.interface";

export class DeleteAvatarUsecase {
    constructor(
        private readonly avatarRepository: AvatarRepository,
        private readonly diskStorageAvatar: IDiskStorageAvatar,
        private readonly exceptionService: IExceptionService,
    ) { }

    private _deleteAvatarDatabaseRecord(userId: number) {
        return this.avatarRepository.deleteAvatar(userId)
    }

    async deleteAvatar(userId: number) {
        const avatarRecord = await this.avatarRepository.findByUserId(userId)
        if (!avatarRecord) {
            this.exceptionService.badRequestException({ message: 'This User has no Avatar saved' })
        }
        if (!avatarRecord.hashedName) {
            await this._deleteAvatarDatabaseRecord(userId)
            this.exceptionService.badRequestException({ message: 'This User has no Avatar saved' })
        }
        await this._deleteAvatarDatabaseRecord(userId)
        const hashedName = avatarRecord.hashedName
        this.diskStorageAvatar.deleteAvatarFile(hashedName)
        return { message: 'avatar deleted successfully' }
    }
}
