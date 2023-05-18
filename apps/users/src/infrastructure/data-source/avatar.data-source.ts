import { Injectable, Inject } from '@nestjs/common';
import { IAvatarDataSource } from '../../domain/data-source/avatar-data-source.interface';
import { AvatarM } from '../../domain/model/avatar';
import { GenericRepository } from '@app/common';

@Injectable()
export class AvatarDataSource implements IAvatarDataSource {
    constructor(
        @Inject('avatarRepository') private readonly avatarRepository: GenericRepository<AvatarM>
    ) { }

    insertAvatar(createAvatardata: AvatarM): Promise<AvatarM> {
        const newAvatar = this.avatarRepository.create(createAvatardata)
        return this.avatarRepository.save(newAvatar)
    }

    findAvatarByUserId(userId: number): Promise<AvatarM | undefined> {
        return this.avatarRepository.findOneBy({ userId })
    }

    deleteAvatar(userId: number): Promise<any> {
        return this.avatarRepository.delete({ userId })
    }

}
