import { AvatarM } from "../model/avatar";
// TODO : add I fot interface
export interface IAvatarDataSource {
    insertAvatar(user: AvatarM): Promise<AvatarM>
    findAvatarByUserId(user_id: number): Promise<AvatarM | undefined>
    deleteAvatar(userId: number): Promise<any>
}