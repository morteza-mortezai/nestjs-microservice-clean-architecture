import { HttpException, Injectable, BadRequestException } from "@nestjs/common";
import { ExceptionsService } from "../exceptions/exceptions.service";
import { HttpService } from "@nestjs/axios";
import { createReadStream } from 'fs'
import { Response } from "express";
import path from 'path'
const fs = require('fs');
import * as stream from 'stream';
import { promisify } from 'util';
const finished = promisify(stream.finished);

// import {} from ''
@Injectable()
export class DiskStoreService {

    getFile(filePath: string, res: Response) {
        const file = createReadStream(path.join(process.cwd(), filePath));
        file.pipe(res);
    }
    createPath(fileName: string) {
        const filePath = path.join('uploads', fileName)
    }
    // async readFile(filePath: string) {
    //     return fsp.readFile(filePath, { encoding: 'base64' });
    // }
    async writeStream(response: any, path: string) {
        const writer = fs.createWriteStream(path);
        response.pipe(writer);
        return finished(writer);

        // const writer = fs.createWriteStream('c.jpg');
        // response.data.pipe(writer);
        // return finished(writer);
    }
}