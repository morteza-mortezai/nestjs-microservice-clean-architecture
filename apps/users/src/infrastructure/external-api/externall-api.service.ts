import { HttpException, Injectable, BadRequestException } from "@nestjs/common";
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
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


    // async getUserById(id: number): Promise<any> {
    //     const { data } = await firstValueFrom(
    //         this.httpService.get<any[]>('http://localhost:3000/cats').pipe(
    //             catchError((error: AxiosError): void => {
    //                 this.exceptionService.badRequestException({ message: error.message, code_error: +error.code }) as any
    //                 // throw error
    //             }),
    //         ),
    //     );
    //     return data;
    // }
    // TODO : catch error
    async getUserById(id: number): Promise<UserM> { //TODO : get from constant or env
        // try {
        const { data } = await firstValueFrom(
            this.httpService
                .get<{ data: UserM }>(`https://reqres.in/api/users/${id}`)
            // .pipe(
            //     catchError((error: AxiosError) => {
            //         //   this.logger.error(error.response.data);
            //         // throw 'An error happened!';
            //         // console.log('error.message', error.message)
            //         // console.log('error.isAxiosError', error.isAxiosError)
            //         // console.log('error.name', error.name)
            //         // console.log('error.response', error.response)
            //         throw this.exceptionService.requestException({ message: error?.response?.statusText, code_error: error?.response?.status })
            //     }
            //     ),
            // )
        );

        return data.data;
        // } catch (error) {
        //     // console.log('api service', error)
        //     // throw new HttpException('d')
        //     catchError((error: AxiosError) => {
        //         this.exceptionService.badRequestException({ message: error.message, code_error: +error.code })
        //     }
        // }
    }

    async downloadAndSaveAvatar(url: string, hashedName: string): Promise<any> {
        // const a = this.httpService
        //     .request({
        //         method: 'get',
        //         url,
        //         responseType: 'stream',
        //     })

        //     .subscribe(response => {
        //         // const writeStream = this.diskStorageService.createWriteStream(path)
        //         //ensure that the user can call `then()` only when the file has
        //         //been downloaded entirely.
        //         // پسوند حذف شود
        //         // const uploadPath = join(process.cwd(), 'apps', 'users', 'uploads', hashedName + '.jpg')
        //         return this.diskStorageService.writeAvatarStream(response.data, hashedName)
        //     });
        // const b = await firstValueFrom(a)
        // return b
        const response = await firstValueFrom(this.httpService.request({ method: 'get', url, responseType: 'stream' }))
        return this.diskStorageService.writeAvatarStream(response.data, hashedName)
    }
}