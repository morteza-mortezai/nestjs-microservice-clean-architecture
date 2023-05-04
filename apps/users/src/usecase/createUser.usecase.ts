import { IExceptionService } from "../domain/exceptions/exception-service.interface";
import { IMessageBrokerService } from "../domain/message-broker/message-broker.interface";
import { UserM } from "../domain/model/user";
import { UserRepository } from "../domain/repository/userRepository.interface";

export class createUserUsecase {
    constructor(// TODO change user repository to userDbService
        private readonly userRepository: UserRepository,
        private readonly exceptionService: IExceptionService,
        private readonly messageBroker: IMessageBrokerService
    ) { }
    async addUser(newUser: UserM) {
        const exist = await this.userRepository.findByEmail(newUser.email)
        if (exist) throw this.exceptionService.conflictException({ message: 'Email Already Token' })
        const createdUser = await this.userRepository.insert(newUser)
        await this.messageBroker.emitUserCreatedEventToMailer(createdUser)
        return createdUser
    }
}