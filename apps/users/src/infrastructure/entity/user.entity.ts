import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import { IsEmail } from "class-validator"
@Entity()
export class User {

    @ObjectIdColumn()
    _id: ObjectId

    @Column({
        nullable: false,
        default: '',
    })
    first_name: string;

    @Column({
        nullable: false,
        default: '',
    })
    last_name: string;

    @Column({
        unique: true,
        nullable: false,
    })
    @IsEmail()
    email: string;

    @Column({
        nullable: false,
        default: '',
    })
    avatar: string;
}

// import { EntitySchema } from 'typeorm';
// import { UserM } from 'src/domain/model/user';

// export const User = new EntitySchema<UserM>({
//     name: 'UserM',
//     target: UserM,
//     columns: {
//         id: {
//             type: Number,
//             primary: true,
//             generated: true,
//         },
//         username: {
//             type: String,
//         },
//         email: {
//             type: String,
//         },
//         password: {
//             type: Boolean,
//             default: true,
//         },
//     },
// });