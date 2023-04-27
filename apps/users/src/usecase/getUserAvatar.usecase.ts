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
        private readonly userRepository: UserRepository,
        private readonly exceptionService: IExceptionService,
        private readonly externalApiService: IExternallApiService,
        private readonly hashService: IHashService,
        private readonly diskStorageAvatar: IDiskStorageAvatar,
    ) { }

    async getAvatar(userId: number) {
        let hashedName = ''
        // search in db
        // const avatar = await this.avatarRepository.findByUserId(userId)
        // if (avatar && avatar.path) {
        //     // get path and get file by it's path

        // }
        // get user
        const user = await this.externalApiService.getUserById(userId)
        // return user
        // get avatr 
        if (user && user.avatar) {

            // console.log('hash', userId)
            hashedName = await this.hashService.generateHashForName(userId, 10)
            // // return hashedName
            await this.externalApiService.downloadAndSaveAvatar(user.avatar, hashedName)
            // console.log('userId', userId, hashedName)
            await this.avatarRepository.insertAvatar({ userId, hashedName })
        }

        return this.diskStorageAvatar.readAvatarBase64(hashedName)
    }
}