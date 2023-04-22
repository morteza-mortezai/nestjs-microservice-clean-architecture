// import { IException } from "./exception.interface";

export interface IFormatCommonExceptionMessage {
  message: string;
  code_error: number;
}
export interface IFormatExceptionMessage {
  message: string;
}

export interface IExceptionService {
  requestException(data: IFormatCommonExceptionMessage): void
  badRequestException(data: IFormatExceptionMessage): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  UnauthorizedException(data?: IFormatExceptionMessage): void;
}
