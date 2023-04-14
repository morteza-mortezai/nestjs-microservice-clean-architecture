import { Inject, Injectable } from '@nestjs/common';
import { RMQ_SERVICE } from '../constants/rmq.constants';
import { CreateUserDto } from '../dto/createUser.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs'
import { RMQ_EVENTS } from '../constants/rmq.constants'
@Injectable()
export class UserService {
  constructor(
    @Inject(RMQ_SERVICE.USERS) private usersClient: ClientProxy
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getUserById(id: number) {
    try {
      const v = await lastValueFrom(this.usersClient.emit(RMQ_EVENTS.GET_USER_BY_ID, id))
      console.log('v**', v)
    } catch (error) {
      console.log('error in order service', error)
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      await lastValueFrom(this.usersClient.emit(RMQ_EVENTS.NEW_USER_CREATED, createUserDto))
    } catch (error) {
      console.log('error in order service', error)
    }
  }

}
