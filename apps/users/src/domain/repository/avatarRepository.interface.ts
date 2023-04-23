import { AvatarM } from "../model/avatar";
// TODO : add I fot interface
export interface AvatarRepository {
    insert(user: AvatarM): Promise<AvatarM>
    findByUserId(user_id: number): Promise<AvatarM | undefined>
}