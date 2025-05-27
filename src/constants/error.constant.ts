import { HttpStatus } from '@nestjs/common';

/**
 * Module: Errors
 * Description: Centralized error messages and status codes for the application.
 * Example: This module contains predefined error messages and corresponding HTTP status codes
 * that can be used throughout the application to handle different error scenarios.
 *
 * Example Config Constants:
 * - To handle a duplicate user name error in the User module:
 *   Errors.USER.DUPLICATE_USERNAME
 *   - Message: 'The provided username is already in use.'
 *   - StatusCode: HttpStatus.CONFLICT
 * - To handle a common error in the application
 *   Errors.COMMON_ERROR
 *   - Message: 'Common error in the application'
 *   - StatusCode: HttpStatus.INTERNAL_SERVER_ERROR
 *
 * Example Usage:
 * - Import the Errors module: import { Errors } from '@n-constants';
 * - Access a specific error type: Errors.AUTH.FORBIDDEN
 * - Use it in a service or controller:
 *   throw new BaseException(Errors.AUTH.FORBIDDEN);
 */

export const Errors = {
  // General Errors
  TOO_MANY_REQUESTS: {
    message: 'Too many requests. <Ref: CO01>',
    statusCode: HttpStatus.TOO_MANY_REQUESTS,
    errorCode: 'CO01',
  },
  DEFAULT: {
    message: 'An error occurred. Please try again later. <Ref: CO02>',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: 'CO02',
  },
  INVALID_INPUT: {
    message: 'Invalid input. Please check your input data. <Ref: CO03>',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'CO03',
  },
  RESOURCE_NOT_FOUND: {
    message: 'The requested resource was not found. <Ref: CO04>',
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: 'CO04',
  },
  UPLOAD_FILE_FAILED: {
    message:
      'There was an error with the uploading of the file. Please try again later. <Ref: CO05>',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: 'CO05',
  },
  VALIDATION_ERROR: {
    message: 'Validation failed. Please check your input data. <Ref: CO06>',
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    errorCode: 'CO06',
  },
  DATABASE_CONNECTION_ERROR: {
    message: 'Database connection error. Please try again later.',
    statusCode: HttpStatus.SERVICE_UNAVAILABLE,
    errorCode: 'CO07',
  },
  PRISMA_ERROR: {
    message: 'Prisma error. Please try again later.',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: 'CO08',
  },
  AUTH: {
    ROLE_NOT_PERMIT: {
      message: 'This user role is not permitted in our system! <Ref: AU01>',
      statusCode: HttpStatus.FORBIDDEN,
      errorCode: 'AU01',
    },
    FORBIDDEN: {
      message: 'Authentication error. Please try again. <Ref: AU02>',
      statusCode: HttpStatus.FORBIDDEN,
      errorCode: 'AU02',
    },
    PHONE_EXISTED: {
      message: 'This phone number already exists. <Ref: AU03>',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'AU03',
    },
    EXPIRED_TOKEN: {
      message: 'Token has expired. <Ref: AU04>',
      statusCode: HttpStatus.UNAUTHORIZED,
      errorCode: 'AU04',
    },
    INVALID_TOKEN: {
      message: 'Invalid token in request. <Ref: AU05>',
      statusCode: HttpStatus.UNAUTHORIZED,
      errorCode: 'AU05',
    },
    INVALID_REFRESH_TOKEN: {
      message: 'Invalid refresh token in request. <Ref: AU06>',
      statusCode: HttpStatus.UNAUTHORIZED,
      errorCode: 'AU06',
    },
    WRONG_CREDENTIALS: {
      message: 'Incorrect email or password. <Ref: AU07>',
      statusCode: HttpStatus.UNAUTHORIZED,
      errorCode: 'AU07',
    },
    USER_NOT_FOUND: {
      message: 'User not found. <Ref: AU08>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'AU08',
    },
    PASSWORD_NOT_MATCH: {
      message: 'Password not match. <Ref: AU09>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'AU09',
    },
  },
  USER: {
    USER_NOT_FOUND: {
      message: 'User not found. <Ref: AU11>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'AU11',
    },
    CODE_EXISTED: {
      message: 'The employee code already exists in the system. <Ref: AU12>',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'AU12',
    },
  },
  ROLE: {
    INVALID_ROLE: {
      message: 'One or more of the provided role IDs are invalid. <Ref: AU31>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'AU31',
    },
    ROLE_NOT_FOUND: {
      message: 'Role not found. <Ref: AU21>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'AU32',
    },
    ROLE_NAME_EXISTS: {
      message: 'The provided role name already exists. <Ref: AU33>',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'AU33',
    },
  },
  PERMISSION: {
    PERMISSION_NOT_FOUND: {
      message: 'Permission not found. <Ref: AU51>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'AU51',
    },
    PERMISSION_NAME_EXISTS: {
      message: 'The provided permission name already exists. <Ref: AU52>',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'AU52',
    },
  },
  OTP: {
    OTP_NOT_MATCH: {
      message: 'Invalid OTP. Please try again. <Ref: AU21>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'AU21',
    },
    OTP_IS_EXPIRED: {
      message:
        'The OTP you have entered has expired. Please generate a new OTP and try again. <Ref: AU22>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'AU22',
    },
    OTP_EXCEEDED_ATTEMPT: {
      message:
        'You have reached maximum number of attempts. Please request for new OTP and try again. <Ref: AU23>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'AU23',
    },
    OTP_EXCEEDED_REQUEST_LIMIT: {
      message: 'You have exceeded the maximum daily OTP request. <Ref: AU24>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'AU24',
    },
  },
};
