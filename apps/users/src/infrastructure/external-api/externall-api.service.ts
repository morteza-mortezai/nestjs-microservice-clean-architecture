import { HttpException, Injectable, BadRequestException } from "@nestjs/common";
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs'
import { ExceptionsService } from "../exceptions/exceptions.service";
import { UserM } from "../../domain/model/user";
import { HttpService } from "@nestjs/axios";
import { IExternallApiService } from "../../domain/external-api/externall-api.interface";
import { join } from "path";
import { DiskStorageAvatarService } from "../disk-storage-avatar/disk-storage-avatar.service";
// const path = require('path')


@Injectable()
export class ExternallApiService implements IExternallApiService {
    constructor(
        private readonly httpService: HttpService,
        private readonly exceptionService: ExceptionsService,
        private readonly diskStorageService: DiskStorageAvatarService,
    ) { }
    async getUserById(id: number): Promise<UserM> {
        const { data } = await firstValueFrom(
            this.httpService
                .get<{ data: UserM }>(`https://reqres.in/api/users/${id}`)
        );
        return data.data;
    }

    async downloadAndSaveAvatar(url: string, hashedName: string): Promise<any> {
        const response = await firstValueFrom(this.httpService.request({ method: 'get', url, responseType: 'stream' }))
        return this.diskStorageService.writeAvatarStream(response.data, hashedName)
    }
}