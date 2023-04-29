// import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
// import { Request, Response } from 'express';
// interface IError {
//   message: string;
// }
// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
//     const message =
//       exception instanceof HttpException
//         ? (exception.getResponse() as IError)
//         : { message: (exception as IError).message };

//     const responseData = {
//       ...{
//         statusCode: status,
//         timestamp: new Date().toISOString(),
//         path: request.url
//       },
//       ...message,
//     }
//     response
//       .status(status)
//       .json(responseData);
//   }
// }
// TODO :
// مشکل فعلی اینه که اکسپشن های MONGO , TYPOORM  را نمی تواند بگیرد
// حتی میشه ارو های اکسیوس هم اینحا هندل کرد

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, BadRequestException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError, TypeORMError } from 'typeorm';
import { MongoBulkWriteError, MongoError } from 'mongodb'
import { AxiosError } from 'axios'
// import { GlobalResponseError } from './global.response.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message = (exception as any)?.message;
    let code: string = 'Exception';
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;

    const ec = exception

    if (ec instanceof HttpException) {
      status = (exception as HttpException).getStatus();
      message = (exception as any).getResponse()?.message ? (exception as any)?.getResponse().message : (exception as any).getResponse()
      code = (exception as HttpException).message
    }
    else if (ec instanceof TypeORMError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY
      message = (exception as TypeORMError).message;
      code = (exception as TypeORMError).name;
    }
    else if (ec instanceof MongoError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY
      message = (exception as MongoError).errmsg;
      code = (exception as MongoError).code as string;
    }
    else if (ec instanceof AxiosError) {
      status = (exception as AxiosError)?.response?.status || (exception as AxiosError)?.status || 500
      message = (exception as AxiosError)?.message;
      code = (exception as AxiosError)?.code;
    }
    else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
    }

    response.status(status).json(globalResponseError(status, message, code, request));
  }
}



export const globalResponseError: (statusCode: number, message: string, code: string, request: Request) => IResponseError = (
  statusCode: number,
  message: string,
  code: string,
  request: Request
): IResponseError => {
  return {
    statusCode: statusCode,
    message,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method
  };
};


export interface IResponseError {
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}