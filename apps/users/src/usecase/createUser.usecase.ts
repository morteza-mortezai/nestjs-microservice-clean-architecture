import { IExceptionService } from "../domain/exceptions/exception-service.interface";
import { IMessageBrokerService } from "../domain/message-broker/message-broker.interface";
import { UserM } from "../domain/model/user";
import { IUserDataSource } from "../domain/repository/userDataSource.interface";

export class createUserUsecase {
    constructor(// TODO change user repository to userDbService
        private readonly userDataSource: IUserDataSource,
        private readonly exceptionService: IExceptionService,
        private readonly messageBroker: IMessageBrokerService
    ) { }
    async createUser(newUser: UserM) {
        const exist = await this.userDataSource.findByEmail(newUser.email)
        if (exist) throw this.exceptionService.conflictException({ message: 'Email Already Token' })
        const createdUser = await this.userDataSource.insert(newUser)
        this.messageBroker.emitUserCreatedEvent(createdUser)
        return createdUser
    }
}