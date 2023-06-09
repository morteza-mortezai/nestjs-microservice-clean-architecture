import { Module } from '@nestjs/common';
import { UserDataSource } from './user.data-source';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entity/user.entity';
import { Avatar } from '../entity/avatar.entity';
import { AvatarDataSource } from './avatar.data-source';
import { GenericRepository } from '@app/common';
import { Repository, EntityManager } from 'typeorm'


@Module({
    imports: [
        TypeOrmModule.forFeature([User, Avatar]),
    ],
    controllers: [],
    providers: [UserDataSource, AvatarDataSource,
        {
            provide: 'avatarRepository',
            useFactory: (manager: EntityManager) => (new GenericRepository(new Repository(Avatar, manager))),
            inject: [EntityManager]
        },
        {
            provide: 'userRepository',
            useFactory: (manager: EntityManager) => (new GenericRepository(new Repository(User, manager))),
            inject: [EntityManager]
        },
    ],
    exports: [UserDataSource, AvatarDataSource]
})
export class DataSourceModule { }
