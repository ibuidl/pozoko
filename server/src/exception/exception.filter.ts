import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Type,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  EntityNotFoundError,
  EntityPropertyNotFoundError,
  QueryFailedError,
} from 'typeorm';

@Catch()
export class ExceptionFilter<T = Error> extends BaseExceptionFilter<T> {
  protected resExceptions: Array<
    { class: Type<Error>; status?: number } | Type<Error>
  > = [
    { class: EntityNotFoundError, status: HttpStatus.NOT_FOUND },
    { class: EntityPropertyNotFoundError, status: HttpStatus.BAD_REQUEST },
    { class: QueryFailedError, status: HttpStatus.BAD_REQUEST },
  ];

  catch(exception: T, host: ArgumentsHost) {
    const applicationRef =
      this.applicationRef ||
      (this.httpAdapterHost && this.httpAdapterHost.httpAdapter)!;

    const resException = this.resExceptions.find((item) =>
      'class' in item
        ? exception instanceof item.class
        : exception instanceof item,
    );

    if (!resException && !(exception instanceof HttpException)) {
      return this.handleUnknownError(exception, host, applicationRef);
    }

    let res: string | object = '';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      res = exception.getResponse();
      status = exception.getStatus();
    } else if (resException) {
      const e = exception as unknown as Error;
      res = e.message;
      if ('class' in resException && resException.status) {
        status = resException.status;
      }
    }

    const message =
      res !== null && typeof res === 'object'
        ? res
        : {
            statusCode: status,
            message: res,
          };
    applicationRef!.reply(host.getArgByIndex(1), message, status);
  }
}
