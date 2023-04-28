export interface IDiskStorageAvatar {
    readAvatarBase64(hashedName: string): Promise<Buffer>,
    writeAvatarStream(response: any, hashedName: string): Promise<any>,
    checkAvatarFileExists(hashedName: string): Promise<boolean>,
    deleteAvatarFile(hashedName: string): Promise<void>
}