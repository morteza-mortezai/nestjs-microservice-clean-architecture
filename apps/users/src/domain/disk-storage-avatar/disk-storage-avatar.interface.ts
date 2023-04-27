export interface IDiskStorageAvatar {
    readAvatarBase64(hashedName: string): Promise<Buffer>,
    writeAvatarStream(response: any, hashedName: string): Promise<any>,
}