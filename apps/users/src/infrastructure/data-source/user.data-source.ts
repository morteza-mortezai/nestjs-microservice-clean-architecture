import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm'
import { UserRepository } from '../../domain/repository/userRepository.interface';
import { UserM } from '../../domain/model/user';

@Injectable()
export class UserDataSource implements UserRepository {

    constructor(@InjectRepository(User) private readonly userEntity: Repository<UserM>) { }

    insert(createUserdata: UserM): Promise<UserM> {
        const newUser = this.userEntity.create(createUserdata)
        return this.userEntity.save(newUser)
    }

    findByEmail(email: string): Promise<UserM | undefined> {
        return this.userEntity.findOneBy({ email })
    }

}
