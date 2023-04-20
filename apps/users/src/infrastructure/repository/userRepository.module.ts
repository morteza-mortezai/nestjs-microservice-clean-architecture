import { Module } from '@nestjs/common';
import { DatabaseUserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entity/user.entity';

// بعدا میتوان یک ماژول برای دیتابیس درست کرد و ان را اینجا وارد کرد الان توارم لصورت گلوبال ایمپورت شده

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [],
    providers: [DatabaseUserRepository],
    exports: [DatabaseUserRepository]
})
export class UserRepositoryModule { }
