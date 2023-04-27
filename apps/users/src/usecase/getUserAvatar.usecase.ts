import { IExceptionService } from "../domain/exceptions/exception-service.interface";
import { UserM } from "../domain/model/user";
import { UserRepository } from "../domain/repository/userRepository.interface";
import { IExternallApiService } from "../domain/external-api/externall-api.interface";
import { AvatarRepository } from "../domain/repository/avatarRepository.interface";
import { IHashService } from "../domain/hash-service/hash-service.interface";

export class GetUserAvatarUsecase {
    constructor(
        private readonly avatarRepository: AvatarRepository,
        private readonly userRepository: UserRepository,
        private readonly exceptionService: IExceptionService,
        private readonly externalApiService: IExternallApiService,
        private readonly hashService: IHashService
    ) { }

    async getAvatar(userId: number) {
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
            const hashedName = await this.hashService.generateHashForName(userId, 10)
            // return hashedName
            this.externalApiService.downloadAndSaveAvatar(user.avatar, hashedName)
        }
        // میشد ابتدا از طریق مدل ولیدیشن انجام داد
        // const exist = await this.userRepository.findByEmail(newUser.email)
        // console.log('exist', exist)
        // if (exist) throw new Error('this email is registered already !')
        // if (exist) throw this.exceptionService.badRequestException({ message: 'exist' })
        // const createdUser = await this.userRepository.insert(newUser)
        // return createdUser
    }
}