import { HttpException, Injectable, BadRequestException } from "@nestjs/common";
import { ExceptionsService } from "../exceptions/exceptions.service";
import { HttpService } from "@nestjs/axios";
import { createReadStream } from 'fs'
import { Response } from "express";
// const {join} = require('path')
import { join } from 'path'
// import {} from ''
@Injectable()
export class DiskStoreService {
    constructor(
        private readonly httpService: HttpService,
        private readonly exceptionService: ExceptionsService,
    ) { }

    getFile(path: string, res: Response) {
        const file = createReadStream(join(process.cwd(), path));
        file.pipe(res);
    }

}