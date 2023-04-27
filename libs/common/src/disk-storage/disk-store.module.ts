import { Module } from '@nestjs/common';
import { DiskStorageService } from './disk-store.service';

@Module({
    imports: [],
    controllers: [],
    providers: [DiskStorageService],
    exports: [DiskStorageService]
})
export class DiskStoreModule { }