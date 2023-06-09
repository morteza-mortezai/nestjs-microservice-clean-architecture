import { Controller, Post, Get, Inject, ParseIntPipe, Param, Delete, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'
import { CreateUserDto } from '../dto/create-user.dto';
import { RMQ_SERVICES, RMQ_CMD } from '@app/common/constants/rmq.constant';
import { lastValueFrom } from 'rxjs'

@Controller()
export class UserController {
    constructor(
        @Inject(RMQ_SERVICES.USERS) private readonly usersClient: ClientProxy
    ) { }

    @Post('users')
    createUser(@Body() createUser: CreateUserDto) {
        return lastValueFrom(this.usersClient.send(RMQ_CMD.CREATE_NEW_USER, createUser))
    }

    @Get('user/:userId')
    async getUserById(@Param('userId', ParseIntPipe) userId: number) {
        return lastValueFrom(this.usersClient.send(RMQ_CMD.GET_USER_BY_ID, userId))
    }

    @Get('user/:userId/avatar')
    async getAvatarByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return lastValueFrom(this.usersClient.send(RMQ_CMD.GET_AVATAR_BY_ID, userId))
    }

    @Delete('user/:userId/avatar')
    async deleteAvatar(@Param('userId', ParseIntPipe) userId: number) {
        return lastValueFrom(this.usersClient.send(RMQ_CMD.DELETE_AVATAR_BY_ID, userId))
    }
}
