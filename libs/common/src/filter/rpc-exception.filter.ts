import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch()
export class RPCExceptionFilter extends BaseRpcExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        return throwError(() => exception);
    }
}
