import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Avatar {

    @ObjectIdColumn()
    _id: ObjectId

    @Column({
        nullable: false,
        unique: true,
        primary: true
    })
    user_id: number;

    @Column({
        nullable: false,
        default: '',
    })
    path: string;

}