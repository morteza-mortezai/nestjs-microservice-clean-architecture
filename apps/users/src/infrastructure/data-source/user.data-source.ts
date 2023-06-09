import { Injectable, Inject } from '@nestjs/common';
import { IUserDataSource } from '../../domain/data-source/user-data-source.interface';
import { UserM } from '../../domain/model/user';
import { GenericRepository } from '@app/common';

@Injectable()
export class UserDataSource implements IUserDataSource {

    constructor(
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
