import { Controller, Post, Get, Body, Inject, HttpException, HttpStatus, ParseIntPipe, Param } from '@nestjs/common';
import { MessagePattern, Payload, RmqContext, Ctx } from '@nestjs/microservices'
import { CreateUserDto } from '../dto/createUser.dto';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { UsecaseProxy } from '../usecase-proxy/usecase-proxy'
import { addUserUsecase } from '../../usecase/addUser.usecase'
import { GetUserFromApiUsecase } from '../../usecase/getUserFromApi.usecase'
import { GetUserAvatarUsecase } from '../../usecase/getUserAvatar.usecase'
import { RMQ_MESSAGES } from '../constants/rmq.constants';

@Controller()
export class UserController {
    constructor(
        @Inject(UsecaseProxyModule.POST_USER_USECASES_PROXY)
        private readonly postUserUsecase: UsecaseProxy<addUserUsecase>,
        @Inject(UsecaseProxyModule.Get_USER_FROM_API_USECASES_PROXY)
        private readonly getUserUsecaseProxy: UsecaseProxy<GetUserFromApiUsecase>,
        @Inject(UsecaseProxyModule.Get_USER_AVATAR_USECASES_PROXY)
        private readonly getAvatarUsecaseProxy: UsecaseProxy<GetUserAvatarUsecase>,
    ) { }
    // @MessagePattern(RMQ_MESSAGES.GET_USER_BY_ID)
    @Post('users')
    async createUser(@Payload() createUser: CreateUserDto) {
        try {
            const createdUser = await this.postUserUsecase.getInstance().addUser(createUser as any)
            return createdUser

        } catch (error) {
            console.log('ee', error)
            return error
        }
    }

    @Get('user/:userId')
    // async createUser(@Payload() userId: number, @Ctx() context: RmqContext) {
    async getUserById(@Param('userId', ParseIntPipe) userId: number) {
        // return 'hello000'
        // try {
        const user = await this.getUserUsecaseProxy.getInstance().getUserFromApi(userId)
        return user

        // } catch (error) {
        // console.log('ee', error)
        // throw error
        // }
    }

    @Get('user/:userId/avatar')
    // async createUser(@Payload() userId: number, @Ctx() context: RmqContext) {
    async getAvatarByUserId(@Param('userId', ParseIntPipe) userId: number) {
        // return 'hello000'
        // try {
        const user = await this.getAvatarUsecaseProxy.getInstance().getAvatar(userId)
        return user

        // } catch (error) {
        // console.log('ee', error)
        // throw error
        // }
    }

}
