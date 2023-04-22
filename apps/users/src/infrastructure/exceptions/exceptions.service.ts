import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { IExceptionService, IFormatExceptionMessage, IFormatCommonExceptionMessage } from '../../domain/exceptions/exception-service.interface';

@Injectable()
export class ExceptionsService implements IExceptionService {
  requestException(data: IFormatCommonExceptionMessage): void {
    throw new HttpException(data.message, data.code_error);
  }
  badRequestException({ message }: IFormatExceptionMessage): void {
    throw new BadRequestException(message);
  }
  internalServerErrorException({ message }: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(message);
  }
  forbiddenException({ message }: IFormatExceptionMessage): void {
    throw new ForbiddenException(message);
  }
  UnauthorizedException({ message }: IFormatExceptionMessage): void {
    throw new UnauthorizedException(message);
  }
}
