import { ErrorHandler, Injectable} from '@angular/core';
import log from 'electron-log';

@Injectable()

export class GlobalErrorHandler implements ErrorHandler {
  constructor() { }
  
  handleError(error: any) {

    const message = error.message ? error.message : error.toString();
    log.error('Error Handler message =', message);

    throw error;
  }
}