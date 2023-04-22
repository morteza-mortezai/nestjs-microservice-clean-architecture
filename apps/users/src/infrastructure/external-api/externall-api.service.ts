import { Injectable } from "@nestjs/common";
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
// import { ExceptionsService } from "../exceptions/exceptions.service";
import { UserM } from "../../domain/model/user";
import { HttpService } from "@nestjs/axios";
@Injectable()
export class ExternallApiService {
    constructor(
        private readonly httpService: HttpService,
        // private readonly exceptionService: ExceptionsService,
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
    async getUserById(id: number): Promise<UserM> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<UserM>(`https://reqres.in/api/users/${id}`)
                // .pipe(
                //     // catchError((error: AxiosError) => {
                //     //     //   this.logger.error(error.response.data);
                //     //     // throw 'An error happened!';
                //     //     this.exceptionService.badRequestException({ message: error.message, code_error: +error.code })
                //     // }
                //     // ),
                // ),
            );

            return data;
        } catch (error) {
            // console.log('api service', error)
            throw error
        }
    }

}