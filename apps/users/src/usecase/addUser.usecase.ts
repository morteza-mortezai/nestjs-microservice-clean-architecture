import { IExceptionService } from "../domain/exceptions/exception-service.interface";
import { UserM } from "../domain/model/user";
import { UserRepository } from "../domain/repository/userRepository.interface";

export class addUserUsecase {
    constructor(// TODO change user repository to userDbService
        private readonly userRepository: UserRepository,
        private readonly exceptionService: IExceptionService
    ) { }
    async addUser(newUser: UserM) {
        // میشد ابتدا از طریق مدل ولیدیشن انجام داد
        // const exist = await this.userRepository.findByEmail(newUser.email)
        // console.log('exist', exist)
        // if (exist) throw new Error('this email is registered already !')
        // if (exist) throw this.exceptionService.badRequestException({ message: 'exist' })
        const createdUser = await this.userRepository.insert(newUser)
        return createdUser
    }
}