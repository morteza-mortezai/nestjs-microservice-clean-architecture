import { Injectable } from '@nestjs/common';
import { IExceptionService, IFormatExceptionMessage, IFormatCommonExceptionMessage } from '../../domain/exceptions/exception-service.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ExceptionsService implements IExceptionService {
  requestException(data: IFormatCommonExceptionMessage): void {
    throw new RpcException({ message: data.message, status: data.code_error })
  }
  badRequestException({ message }: IFormatExceptionMessage): void {
    throw new RpcException({ message, status: 400 })
  }
  internalServerErrorException({ message }: IFormatExceptionMessage): void {
    throw new RpcException({ message, status: 500 })
  }
  forbiddenException({ message }: IFormatExceptionMessage): void {
    throw new RpcException({ message, status: 403 })
  }
  conflictException({ message }: IFormatExceptionMessage): void {
    throw new RpcException({ message, status: 409 })
  }
}
