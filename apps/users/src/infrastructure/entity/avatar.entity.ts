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
    userId: number;

    @Column({
        nullable: false,
        default: '',
    })
    hashedName: string;

}