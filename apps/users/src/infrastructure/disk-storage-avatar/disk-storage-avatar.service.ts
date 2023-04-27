import { Injectable } from '@nestjs/common';
import { IDiskStorageAvatar } from '../../domain/disk-storage-avatar/disk-storage-avatar.interface';
import { DiskStorageService } from '@app/common';
import * as path from 'path'

@Injectable()
export class DiskStorageAvatarService implements IDiskStorageAvatar {
  constructor(
    private readonly diskStorage: DiskStorageService
  ) { }

  private _avatarFilePath(hashedName: string) {
    return path.join(process.cwd(), 'apps', 'users', 'uploads', hashedName)
  }

  readAvatarBase64(hashedName: string): Promise<Buffer> {
    const avatarPath = this._avatarFilePath(hashedName)
    return this.diskStorage.readFile(avatarPath, { encoding: 'base64' })
  }

  writeAvatarStream(response: any, hashedName: string): Promise<any> {
    const avatarPath = this._avatarFilePath(hashedName)
    return this.diskStorage.writeStream(response, avatarPath)
  }
}
