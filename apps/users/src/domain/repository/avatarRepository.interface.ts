import { AvatarM } from "../model/avatar";
// TODO : add I fot interface
export interface AvatarRepository {
    insertAvatar(user: AvatarM): Promise<AvatarM>
    findByUserId(user_id: number): Promise<AvatarM | undefined>
}