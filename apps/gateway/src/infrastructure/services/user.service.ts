import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs'
import { RMQ_MESSAGES, RMQ_SERVICES } from '../constants/rmq.constants'

@Injectable()
export class UserService {
  constructor(
    @Inject(RMQ_SERVICES.BILLING) private usersClient: ClientProxy
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getUserById(id: string) {
    try {
      const v = await lastValueFrom(this.usersClient.send(RMQ_MESSAGES.GET_USER_BY_ID, id))
      console.log('v**', v)
    } catch (error) {
      console.log('error in order service', error)
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      await lastValueFrom(this.usersClient.emit(RMQ_MESSAGES.NEW_USER_CREATED, createUserDto))
    } catch (error) {
      console.log('error in order service', error)
    }
  }

}
