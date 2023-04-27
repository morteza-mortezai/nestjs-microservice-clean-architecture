import { Module } from '@nestjs/common';
import { DiskStoreModule } from '@app/common';
import { DiskStorageAvatarService } from './disk-storage-avatar.service';

@Module({
  imports: [DiskStoreModule],
  providers: [DiskStorageAvatarService],
  exports: [DiskStorageAvatarService],
})
export class DiskStorageAvatarModule { }
