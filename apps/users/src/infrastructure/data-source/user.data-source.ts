import { Injectable, Inject } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../entity/user.entity';
// import { Repository } from 'typeorm'
import { IUserDataSource } from '../../domain/repository/userDataSource.interface';
import { UserM } from '../../domain/model/user';
import { GenericRepository } from '@app/common';

@Injectable()
export class UserDataSource implements IUserDataSource {

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
