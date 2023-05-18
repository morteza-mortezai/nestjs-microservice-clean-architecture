import { Controller, Post, Get, Inject, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { Payload } from '@nestjs/microservices'
import { CreateUserDto } from '../dto/createUser.dto';



@Controller()
export class UserController {
    constructor(
    ) { }
    // @MessagePattern(RMQ_MESSAGES.GET_USER_BY_ID)
    @Post('users')
    async createUser(@Payload() createUser: CreateUserDto) {

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
