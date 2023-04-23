import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
interface IError {
  message: string;
}
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : { message: (exception as IError).message };

    const responseData = {
      ...{
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url
      },
      ...message,
    }
    response
      .status(status)
      .json(responseData);
  }
}


// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, BadRequestException, HttpStatus, Logger } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError } from 'typeorm';
// import { MongoBulkWriteError } from 'mongodb'
// // import { GlobalResponseError } from './global.response.error';

// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     let message = (exception as any).message.message;
//     let code = 'HttpException';

//     Logger.error(message, (exception as any).stack, `${request.method} ${request.url}`);

//     let status = HttpStatus.INTERNAL_SERVER_ERROR;

//     switch (exception.constructor) {
//       case HttpException:
//         status = (exception as HttpException).getStatus();
//         message = 'bbbbbbbb'
//         code = 'aaaaaaaa';
//         break;
//       case QueryFailedError:  // this is a TypeOrm error
//         status = HttpStatus.UNPROCESSABLE_ENTITY
//         message = (exception as QueryFailedError).message;
//         code = (exception as any).code;
//         break;
//       case EntityNotFoundError:  // this is another TypeOrm error
//         status = HttpStatus.UNPROCESSABLE_ENTITY
//         message = (exception as EntityNotFoundError).message;
//         code = (exception as any).code;
//         break;
//       case CannotCreateEntityIdMapError: // and another
//         status = HttpStatus.UNPROCESSABLE_ENTITY
//         message = (exception as CannotCreateEntityIdMapError).message;
//         code = (exception as any).code;
//         break;
//       case MongoBulkWriteError: // and another
//         status = HttpStatus.NOT_ACCEPTABLE
//         message = (exception as MongoBulkWriteError).errmsg;
//         code = (exception as any).code;
//         break;
//       default:
//         status = HttpStatus.INTERNAL_SERVER_ERROR
//     }

//     response.status(status).json(globalResponseError(status, message, code, request));
//   }
// }


// // import { Request } from 'express';
// // import { IResponseError } from './response.error.interface';

// export const globalResponseError: (statusCode: number, message: string, code: string, request: Request) => IResponseError = (
//   statusCode: number,
//   message: string,
//   code: string,
//   request: Request
// ): IResponseError => {
//   return {
//     statusCode: statusCode,
//     message,
//     code,
//     timestamp: new Date().toISOString(),
//     path: request.url,
//     method: request.method
//   };
// };


// export interface IResponseError {
//   statusCode: number;
//   message: string;
//   code: string;
//   timestamp: string;
//   path: string;
//   method: string;
// }