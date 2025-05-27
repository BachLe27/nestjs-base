// common/exceptions/base.exception.ts
import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(error: {
    message: string;
    statusCode: number;
    errorCode: string;
  }) {
    super(
      {
        message: error.message,
        errorCode: error.errorCode,
      },
      error.statusCode,
    );
  }
}
