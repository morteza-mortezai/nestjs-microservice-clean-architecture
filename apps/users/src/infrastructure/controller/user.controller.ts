import { Controller, Post, Body, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RmqContext, Ctx } from '@nestjs/microservices'
import { CreateUserDto } from '../dto/createUser.dto';
import { diModule } from '../di/di.module';
import { DiProxy } from '../di/di'
import { addUserUsecase } from '../../usecase/addUser.usecase'
import { RMQ_MESSAGES } from '../constants/rmq.constants';

@Controller('users')
export class UserController {
    constructor(
        @Inject(diModule.POST_USER_USECASES_PROXY)
        private readonly postUserUsecaseDi: DiProxy<addUserUsecase>
    ) { }

    @MessagePattern(RMQ_MESSAGES.GET_USER_BY_ID)
    async createUser(@Payload() createUser: CreateUserDto, @Ctx() context: RmqContext) {

        // try {
        const createdUser = await this.postUserUsecaseDi.getInstance().addUser(createUser as any)
        return createdUser

        // } catch (error) {
        // console.log('ee', error)
        // throw error
        // }
    }
}
