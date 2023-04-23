import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm'
import { AvatarRepository } from '../../domain/repository/avatarRepository.interface';
import { UserM } from '../../domain/model/user';
import { AvatarM } from '../../domain/model/avatar';

@Injectable()
export class DatabaseAvatarRepository implements AvatarRepository {

    constructor(@InjectRepository(User) private readonly avatarEntity: Repository<AvatarM>) { }

    insert(createUserdata: AvatarM): Promise<AvatarM> {
        const newAvatar = this.avatarEntity.create(createUserdata)
        return this.avatarEntity.save(newAvatar)
    }


    findByUserId(user_id: number): Promise<AvatarM> {
        return this.avatarEntity.findOneBy({ user_id: user_id.toString() })
    }

}
