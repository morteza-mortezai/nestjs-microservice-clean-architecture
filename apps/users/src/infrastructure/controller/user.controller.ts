import { Controller, Post, Get, Inject, ParseIntPipe, Param, Delete, Body } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { UsecaseProxy } from '../usecase-proxy/usecase-proxy'
import { CreateUserUsecase } from '../../usecase/create-user.usecase'
import { GetUserFromApiUsecase } from '../../usecase/get-user-from-api.usecase'
import { GetUserAvatarUsecase } from '../../usecase/get-user-avatar.usecase'
import { DeleteAvatarUsecase } from '../../usecase/delete-avatar.usecase'


@Controller()
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

    ) { }

    @Post('users')
    async createUser(@Body() createUser: CreateUserDto) {
        const createdUser = await this.postUserUsecase.getInstance().createUser(createUser as any)
        return createdUser
    }

    @Get('user/:userId')
    async getUserById(@Param('userId', ParseIntPipe) userId: number) {
        const user = await this.getUserUsecaseProxy.getInstance().getUserFromApi(userId)
        return user
    }

    @Get('user/:userId/avatar')
    async getAvatarByUserId(@Param('userId', ParseIntPipe) userId: number) {
        const user = await this.getAvatarUsecaseProxy.getInstance().getAvatar(userId)
        return user
    }

    @Delete('user/:userId/avatar')
    async deleteAvatar(@Param('userId', ParseIntPipe) userId: number) {
        return this.deleteAvatarUsecase.getInstance().deleteAvatar(userId)
    }

}
