import { IException } from "../domain/exceptions/exceptions.interface";
import { UserM } from "../domain/model/user";
import { UserRepository } from "../domain/repository/userRepository.interface";
import { BadRequestException } from '@nestjs/common';
export class addUserUsecase {
    constructor(
        private readonly httpClient,
        private readonly errorService: IException
    ) { }
    async getUserFromApi(id: number) {

        try {
            const user = await this.httpClient.getById(id)

        } catch (error) {
            throw this.errorService.badRequestException({ message: 'error getting user', code_error: 400 })
        }
        // میشد ابتدا از طریق مدل ولیدیشن انجام داد
        const exist = await this.userRepository.findByEmail(newUser.email)
        console.log('exist', exist)
        // if (exist) throw new Error('this email is registered already !')
        if (exist) throw this.errorService.badRequestException({ message: 'exist', code_error: 400 })
        const createdUser = await this.userRepository.insert(newUser)
        return createdUser
    }
}