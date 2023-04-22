import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/createUser.dto';

@Controller()
export class UserController {
  constructor(private readonly usersService: UsersService) { }

  @Post('users')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('user/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }


  // @Get('user/:id/avatar')
  // async getAvatar(@Param('id', ParseIntPipe) id: number): Promise<any> {
  //     try {
  //         // check if it exists already
  //         let fileName = await this.avatarService.avatarExist(id)
  //         if (!fileName) {
  //             //get user
  //             const user = await this.usersService.findOne(id)
  //             // get and save avatar
  //             fileName = await this.avatarService.getAndSaveAvatar(user)
  //         }
  //         return this.avatarService.readFile(fileName as string)

  //     } catch (error) {
  //         return error
  //     }
  // }

  // @Delete('user/:id/avatar')
  // async delete(@Param('id', ParseIntPipe) id: number) {
  //     return this.avatarService.delete(id);
  // }
}
