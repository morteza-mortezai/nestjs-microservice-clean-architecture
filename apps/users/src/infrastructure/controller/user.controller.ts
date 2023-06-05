import { Controller, Post, Get, Inject, ParseIntPipe, Param, Delete, UseFilters } from '@nestjs/common';
import { Payload, MessagePattern, RpcException, RmqContext, Ctx } from '@nestjs/microservices'
import { CreateUserDto } from '../dto/create-user.dto';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { UsecaseProxy } from '../usecase-proxy/usecase-proxy'
import { CreateUserUsecase } from '../../usecase/create-user.usecase'
import { GetUserFromApiUsecase } from '../../usecase/get-user-from-api.usecase'
import { GetUserAvatarUsecase } from '../../usecase/get-user-avatar.usecase'
import { DeleteAvatarUsecase } from '../../usecase/delete-avatar.usecase'
import { RMQ_CMD } from '@app/common/constants/rmq.constant';
import { UserM } from '../../domain/model/user';
import { RabbitmqService } from '../config/rabbit-mq/rabbit-mq.service';
import { GlobalExceptionFilter2 } from '@app/common/filter/exception2.filter';


@Controller()

@UseFilters(GlobalExceptionFilter2)
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
        const user = await this.getUserUsecaseProxy.getInstance().getUserFromApi(userId)
        this.rabbitmqService.ack(context)
        return user
    }

    @Get('user/:userId/avatar')
    // async createUser(@Payload() userId: number, @Ctx() context: RmqContext) {
    async getAvatarByUserId(@Param('userId', ParseIntPipe) userId: number) {
        const user = await this.getAvatarUsecaseProxy.getInstance().getAvatar(userId)
        return user
    }

    @Delete('user/:userId/avatar')
    async deleteAvatar(@Param('userId', ParseIntPipe) userId: number) {
        return this.deleteAvatarUsecase.getInstance().deleteAvatar(userId)
    }

}
