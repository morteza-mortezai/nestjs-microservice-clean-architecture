import { Module } from '@nestjs/common';
import { ExceptionsModule } from '../exceptions/exceptions.module';

@Module({
    imports: [

        ExceptionsModule
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class DiskStoreModule { }