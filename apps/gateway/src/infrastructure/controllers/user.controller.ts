import { Controller, Post, Get, Inject, ParseIntPipe, Param, Delete, HttpException, BadRequestException, Body } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices'
import { CreateUserDto } from '../dto/create-user.dto';
import { RMQ_SERVICES, RMQ_CMD } from '@app/common/constants/rmq.constant';
import { catchError, lastValueFrom } from 'rxjs'

@Controller()
export class UserController {
    constructor(
        @Inject(RMQ_SERVICES.USERS) private readonly usersClient: ClientProxy
    ) { }

    @Post('users')
    async createUser(@Body() createUser: CreateUserDto) {
        const v = await lastValueFrom(this.usersClient.send(RMQ_CMD.CREATE_NEW_USER, createUser))
        return v
        // return this.usersClient.send(RMQ_EVENTS.CREATE_NEW_USER, createUser).pipe(
        //     catchError((v) => { throw new BadRequestException('ex0000') })
        // )

    }

    @Get('user/:userId')
    // async createUser(@Payload() userId: number, @Ctx() context: RmqContext) {
    async getUserById(@Param('userId', ParseIntPipe) userId: number) {

    }

    @Get('user/:userId/avatar')
    // async createUser(@Payload() userId: number, @Ctx() context: RmqContext) {
    async getAvatarByUserId(@Param('userId', ParseIntPipe) userId: number) {

    }

    @Delete('user/:userId/avatar')
    async deleteAvatar(@Param('userId', ParseIntPipe) userId: number) {
    }

}
