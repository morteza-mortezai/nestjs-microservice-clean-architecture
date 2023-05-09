import { RMQ_MESSAGES } from '@app/common/constants/rmq.constant';
import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'
import { UserM } from '../../domain/model/user';
import { CreateUserDto } from '../dto/createUser.dto';
@Controller()
export class MailerController {

  @EventPattern(RMQ_MESSAGES.NEW_USER_CREATED) // TODO : print user
  sendConfirmationMail(@Payload() user: CreateUserDto, @Ctx() context: RmqContext): string {
    console.log('hi********', user)
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
    return 'Hello'
  }
}
