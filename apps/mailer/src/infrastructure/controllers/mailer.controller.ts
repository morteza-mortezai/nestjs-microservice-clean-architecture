import { RMQ_MESSAGES } from '@app/common/constants/rmq.constant';
import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { UserM } from '../../domain/model/user';
import { CreateUserDto } from '../dto/createUser.dto';
import { UsecaseProxy } from '../usecase-proxy/usecase-proxy';
import { ConfirmMailUsecase } from '../../usecase/sendConfirmMail.usecase'
@Controller()
export class MailerController {
  constructor(
    @Inject(UsecaseProxyModule.SEND_CONFIRM_EMAIL_USECASES_PROXY)
    private readonly confirmMailUsecase: UsecaseProxy<ConfirmMailUsecase>,
    // private readonly disk: DiskStoreService,
  ) { }
  @EventPattern(RMQ_MESSAGES.NEW_USER_CREATED) // TODO : print user
  async sendConfirmationMail(@Payload() newUser: UserM, @Ctx() context: RmqContext) {
    const result = await this.confirmMailUsecase.getInstance().sendEmail(newUser)
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return result
  }
}
