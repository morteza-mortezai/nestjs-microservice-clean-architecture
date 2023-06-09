import { Injectable, Inject } from '@nestjs/common';
import { IMessageBrokerService } from '../../domain/message-broker/message-broker.interface';
import { RMQ_SERVICES, RMQ_EVENTS } from '@app/common/constants/rmq.constant';
import { ClientProxy } from '@nestjs/microservices';
import { UserM } from '../../domain/model/user';
import { firstValueFrom } from 'rxjs'


@Injectable()
export class MessageBrokerService implements IMessageBrokerService {
    constructor(
        @Inject(RMQ_SERVICES.MAILER) private readonly mailerClient: ClientProxy
    ) { }

    emitUserCreatedEvent(newUser: UserM): Promise<any> {
        return firstValueFrom(this.mailerClient.emit(RMQ_EVENTS.NEW_USER_CREATED, newUser))
    }

}
