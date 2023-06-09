import { Controller, Get, Inject, ParseIntPipe, Param, Delete, UseFilters } from '@nestjs/common';
import { Payload, MessagePattern, RmqContext, Ctx } from '@nestjs/microservices'
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { UsecaseProxy } from '../usecase-proxy/usecase-proxy'
import { CreateUserUsecase } from '../../usecase/create-user.usecase'
import { GetUserFromApiUsecase } from '../../usecase/get-user-from-api.usecase'
import { GetUserAvatarUsecase } from '../../usecase/get-user-avatar.usecase'
import { DeleteAvatarUsecase } from '../../usecase/delete-avatar.usecase'
import { RMQ_CMD } from '@app/common/constants/rmq.constant';
import { UserM } from '../../domain/model/user';
import { RabbitmqService } from '../config/rabbit-mq/rabbit-mq.service';
import { RPCExceptionFilter } from '@app/common/filter/rpc-exception.filter';


@Controller()

@UseFilters(RPCExceptionFilter)
export class UserController {
    constructor(
        @Inject(UsecaseProxyModule.POST_USER_USECASES_PROXY)
        private readonly postUserUsecase: UsecaseProxy<CreateUserUsecase>,
        @Inject(UsecaseProxyModule.Get_USER_FROM_API_USECASES_PROXY)
        private readonly getUserUsecaseProxy: UsecaseProxy<GetUserFromApiUsecase>,
        @Inject(UsecaseProxyModule.Get_USER_AVATAR_USECASES_PROXY)
        private readonly getAvatarUsecaseProxy: UsecaseProxy<GetUserAvatarUsecase>,
        @Inject(UsecaseProxyModule.Delete_USER_AVATAR_USECASES_PROXY)
        private readonly deleteAvatarUsecase: UsecaseProxy<DeleteAvatarUsecase>,
        private readonly rabbitmqService: RabbitmqService,
    ) { }
    @MessagePattern(RMQ_CMD.CREATE_NEW_USER)
    async createUser(@Payload() createUser: UserM, @Ctx() context: RmqContext) {
        const createdUser = await this.postUserUsecase.getInstance().createUser(createUser)
        this.rabbitmqService.ack(context)
        return createdUser
    }
    @MessagePattern(RMQ_CMD.GET_USER_BY_ID)
    async getUserById(@Payload() userId: number, @Ctx() context: RmqContext) {
        this.rabbitmqService.ack(context)
        const user = await this.getUserUsecaseProxy.getInstance().getUserFromApi(userId)
        return user
    }

    @MessagePattern(RMQ_CMD.GET_AVATAR_BY_ID)
    async getAvatarByUserId(@Payload() userId: number) {
        const user = await this.getAvatarUsecaseProxy.getInstance().getAvatar(userId)
        return user
    }

    @MessagePattern(RMQ_CMD.DELETE_AVATAR_BY_ID)
    async deleteAvatar(@Payload() userId: number) {
        return this.deleteAvatarUsecase.getInstance().deleteAvatar(userId)
    }

}
