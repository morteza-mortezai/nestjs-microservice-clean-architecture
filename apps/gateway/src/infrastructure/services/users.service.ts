import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs'
import { RMQ_MESSAGES, RMQ_SERVICES } from '../constants/rmq.constants'

@Injectable()
export class UsersService {
  constructor(
    @Inject(RMQ_SERVICES.USERS) private usersClient: ClientProxy
  ) { }

  getHello(): string {
    return 'Hello World!';
  }
  // TODO : time out gerefte shavad
  async getUserById(id: number) {
    try {
      const v = await lastValueFrom(this.usersClient.send(RMQ_MESSAGES.GET_USER_BY_ID, id).pipe(timeout(15000)))
      // this.usersClient.send(RMQ_MESSAGES.GET_USER_BY_ID, id).pipe(timeout(5000))
      console.log('v**', v)
      return v
    } catch (error) {
      console.log('error in gateway', error)
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      await lastValueFrom(this.usersClient.emit(RMQ_MESSAGES.CREATE_NEW_USER, createUserDto))
    } catch (error) {
      console.log('error in order service', error)
    }
  }

}