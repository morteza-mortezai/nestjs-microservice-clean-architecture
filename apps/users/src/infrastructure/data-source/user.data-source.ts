import { Injectable, Inject } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../entity/user.entity';
// import { Repository } from 'typeorm'
import { UserRepository } from '../../domain/repository/userRepository.interface';
import { UserM } from '../../domain/model/user';
import { GenericRepository } from '@app/common';

@Injectable()
export class UserDataSource implements UserRepository {

    constructor(
        // @InjectRepository(User) private readonly userEntity: Repository<UserM>,
        @Inject('userRepository') private readonly userRepository: GenericRepository<UserM>
    ) { }

    insert(createUserdata: UserM): Promise<UserM> {
        const newUser = this.userRepository.create(createUserdata)
        return this.userRepository.save(newUser)
    }

    findByEmail(email: string): Promise<UserM | undefined> {
        return this.userRepository.findOneBy({ email })
    }

}
