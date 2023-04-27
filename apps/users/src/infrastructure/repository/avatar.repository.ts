import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Avatar } from '../entity/avatar.entity';
import { Repository } from 'typeorm'
import { AvatarRepository } from '../../domain/repository/avatarRepository.interface';
import { UserM } from '../../domain/model/user';
import { AvatarM } from '../../domain/model/avatar';

@Injectable()
export class DatabaseAvatarRepository implements AvatarRepository {

    constructor(@InjectRepository(Avatar) private readonly avatarEntity: Repository<AvatarM>) { }

    insertAvatar(createAvatardata: AvatarM): Promise<AvatarM> {
        const newAvatar = this.avatarEntity.create(createAvatardata)
        return this.avatarEntity.save(newAvatar)
    }


    findByUserId(userId: number): Promise<AvatarM> {
        return this.avatarEntity.findOneBy({ userId })
    }

}
