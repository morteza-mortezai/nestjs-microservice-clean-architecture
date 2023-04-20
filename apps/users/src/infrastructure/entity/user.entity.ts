import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    username: string;

    @Column({
        name: 'email_address',
        nullable: false,
        default: '',
    })
    email: string;

    @Column({
        nullable: false,
        default: '',
    })
    password: string;
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