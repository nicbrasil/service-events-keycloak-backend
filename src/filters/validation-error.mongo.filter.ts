import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ValidationErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let message = exception.message;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = exception.status || 500;

    if ('ValidationError' == exception.constructor.name) {
      // Mongoose validation error. Show all errors from path
      message = Object.keys(exception.errors)
        .map((key) => exception.errors[key].message)
        .join('\n');
      status = 400;
    }

    return response.status(status).json({
      now: new Date().toISOString(),
      message,
      error: exception.constructor.name,
    });
  }
}
