import { Injectable } from "@nestjs/common";
import * as fs from 'fs'
import * as fsp from 'fs/promises'
import * as stream from 'stream';
import { promisify } from 'util';
const finished = promisify(stream.finished);


@Injectable()
export class DiskStorageService {

    async writeStream(response: any, path: string) {
        const writer = fs.createWriteStream(path);
        response.pipe(writer);
        return finished(writer);
    }

    async readFile(filePath: string, options: any) {
        return fsp.readFile(filePath, options);
    }

    async checkFileExists(filePath: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.access(filePath, fs.constants.F_OK, error => {
                resolve(!error);
            });
        });
    }

    async deleteFile(filePath: string): Promise<void> {
        const fileExist = await this.checkFileExists(filePath)
        if (fileExist) {
            return fsp.unlink(filePath)
        }
    }
}