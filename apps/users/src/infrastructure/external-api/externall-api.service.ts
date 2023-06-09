import { Injectable } from "@nestjs/common";
import { firstValueFrom } from 'rxjs'
import { UserM } from "../../domain/model/user";
import { HttpService } from "@nestjs/axios";
import { IExternallApiService } from "../../domain/external-api/externall-api.interface";
import { DiskStorageAvatarService } from "../disk-storage-avatar/disk-storage-avatar.service";


@Injectable()
export class ExternallApiService implements IExternallApiService {
    constructor(
        private readonly httpService: HttpService,
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