import { Module } from '@nestjs/common';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { DiskStoreService } from './disk-store.service';

@Module({
    imports: [

        ExceptionsModule
    ],
    controllers: [],
    providers: [DiskStoreService],
    exports: [DiskStoreService]
})
export class DiskStoreModule { }