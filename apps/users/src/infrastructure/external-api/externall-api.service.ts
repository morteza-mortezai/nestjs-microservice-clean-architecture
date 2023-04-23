import { HttpException, Injectable, BadRequestException } from "@nestjs/common";
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { ExceptionsService } from "../exceptions/exceptions.service";
import { UserM } from "../../domain/model/user";
import { HttpService } from "@nestjs/axios";
import { IExternallApiService } from "../../domain/external-api/externall-api.interface";

@Injectable()
export class ExternallApiService implements IExternallApiService {
    constructor(
        private readonly httpService: HttpService,
        private readonly exceptionService: ExceptionsService,
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
            this.httpService.get<{ data: UserM }>(`https://reqres.in/api/users/${id}`)
                .pipe(
                    catchError((error: AxiosError) => {
                        //   this.logger.error(error.response.data);
                        // throw 'An error happened!';
                        // console.log('error.message', error.message)
                        // console.log('error.isAxiosError', error.isAxiosError)
                        // console.log('error.name', error.name)
                        // console.log('error.response', error.response)
                        throw this.exceptionService.requestException({ message: error?.response?.statusText, code_error: error?.response?.status })
                    }
                    ),
                ),
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
    async getAvatarByUrl(url: string): Promise<any> {
        return this.httpService.get(url)
    }
}