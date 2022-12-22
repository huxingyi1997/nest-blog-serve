import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExecptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    const exceptionResponse = exception.getResponse();
    const validatiorMessage =
      typeof exceptionResponse === 'object'
        ? (exceptionResponse as any).message[0]
        : exceptionResponse;
    response.status(status).json({
      code: status,
      message: validatiorMessage || message,
    });
  }
}
