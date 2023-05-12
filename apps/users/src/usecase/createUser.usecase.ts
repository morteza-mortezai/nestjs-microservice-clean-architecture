import { IAppMailer } from "../domain/app-mailer/app-mailer.abstract";
import { IExceptionService } from "../domain/exceptions/exception-service.interface";
import { IMessageBrokerService } from "../domain/message-broker/message-broker.interface";
import { UserM } from "../domain/model/user";
import { IUserDataSource } from "../domain/repository/userDataSource.interface";

export class CreateUserUsecase {
    constructor(
        private readonly userDataSource: IUserDataSource,
        private readonly exceptionService: IExceptionService,
        private readonly messageBroker: IMessageBrokerService,

    ) { }
    // it would be better to use transactions here .
    // unfortunately TYPEORM/MongoDB doesn't support it yet. 
    async createUser(newUser: UserM) {
        const exist = await this.userDataSource.findByEmail(newUser.email)
        if (exist) throw this.exceptionService.conflictException({ message: 'Email Already Token' })
        const createdUser = await this.userDataSource.insert(newUser)
        // await this.appMailer.sendConfirmEmail(createdUser)
        this.messageBroker.emitUserCreatedEvent(createdUser)
        return createdUser
    }
}