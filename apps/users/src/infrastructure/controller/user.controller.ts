import { Controller, Post, Get, Body, Inject, HttpException, HttpStatus, ParseIntPipe, Param } from '@nestjs/common';
import { MessagePattern, Payload, RmqContext, Ctx } from '@nestjs/microservices'
import { CreateUserDto } from '../dto/createUser.dto';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { UsecaseProxy } from '../usecase-proxy/usecase-proxy'
import { addUserUsecase } from '../../usecase/addUser.usecase'
import { GetUserFromApiUsecase } from '../../usecase/getUserFromApi.usecase'
import { RMQ_MESSAGES } from '../constants/rmq.constants';

@Controller('api')
export class UserController {
    constructor(
        @Inject(UsecaseProxyModule.POST_USER_USECASES_PROXY)
        private readonly postUserUsecase: UsecaseProxy<addUserUsecase>,
        @Inject(UsecaseProxyModule.Get_USER_FROM_API_USECASES_PROXY)
        private readonly getUserUsecaseProxy: UsecaseProxy<GetUserFromApiUsecase>,
    ) { }

    @Get('user/:id')
    // async createUser(@Payload() id: number, @Ctx() context: RmqContext) {
    async createUser(@Param('id', ParseIntPipe) id: number) {
        // return 'hello000'
        // try {
        const user = await this.getUserUsecaseProxy.getInstance().getUserFromApi(id)
        return user

        // } catch (error) {
        // console.log('ee', error)
        // throw error
        // }
    }
    // @MessagePattern(RMQ_MESSAGES.GET_USER_BY_ID)
    // async createUser1(@Payload() createUser: CreateUserDto, @Ctx() context: RmqContext) {

    //     // try {
    //     // const createdUser = await this.postUserUsecase.getInstance().addUser(createUser as any)
    //     // return createdUser

    //     // } catch (error) {
    //     // console.log('ee', error)
    //     // throw error
    //     // }
    // }
}
