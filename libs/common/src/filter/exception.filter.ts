
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { TypeORMError } from 'typeorm';
import { MongoError } from 'mongodb'
import { AxiosError } from 'axios'

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