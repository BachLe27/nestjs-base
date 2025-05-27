import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

const DEFAULT_ERROR = {
  MESSAGE: 'Internal server error',
  STATUS_CODE: HttpStatus.INTERNAL_SERVER_ERROR,
  ERROR_CODE: 'UNKNOWN',
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('exception', exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = DEFAULT_ERROR.STATUS_CODE;
    let message = DEFAULT_ERROR.MESSAGE;
    let errorCode = DEFAULT_ERROR.ERROR_CODE;

    if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      status = exception.getStatus();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      message = res.message || message;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      errorCode = res.errorCode || errorCode;
    }

    response.status(status).json({
      statusCode: status,
      errorCode,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
