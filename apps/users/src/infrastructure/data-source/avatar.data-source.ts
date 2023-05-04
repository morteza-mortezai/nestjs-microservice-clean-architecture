import { Injectable, Inject } from '@nestjs/common';
import { IAvatarDataSource } from '../../domain/repository/avatarDataSource.interface';
import { AvatarM } from '../../domain/model/avatar';
import { GenericRepository } from '@app/common';
// import { Avatar } from '../entity/avatar.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm'

@Injectable()
export class AvatarDataSource implements IAvatarDataSource {
    constructor(
        // @InjectRepository(Avatar) private readonly avatarEntity: Repository<AvatarM>,
        @Inject('avatarRepository') private readonly avatarRepository: GenericRepository<AvatarM>
    ) { }

    insertAvatar(createAvatardata: AvatarM): any {
        const newAvatar = this.avatarRepository.create(createAvatardata)
        return this.avatarRepository.create(newAvatar)
    }

    findAvatarByUserId(userId: number) {
        // return this.avatarEntity.findOneBy({ userId })
        return this.avatarRepository.findOneBy({ userId })
    }

    deleteAvatar(userId: number): Promise<any> {
        return this.avatarRepository.delete({ userId })
    }

}
