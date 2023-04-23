import { Module } from '@nestjs/common';
import { DatabaseUserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entity/user.entity';
import { DatabaseAvatarRepository } from './avatar.repository';

// بعدا میتوان یک ماژول برای دیتابیس درست کرد و ان را اینجا وارد کرد الان توارم لصورت گلوبال ایمپورت شده

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [],
    providers: [DatabaseUserRepository, DatabaseAvatarRepository],
    exports: [DatabaseUserRepository, DatabaseAvatarRepository]
})
export class RepositoriesModule { }
