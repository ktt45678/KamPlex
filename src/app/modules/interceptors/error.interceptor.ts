import { ErrorHandler, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {

  constructor(/*private messageService: MessageService*/) { }

  handleError(error: Error) {
    //this.messageService.add({ severity: 'error', summary: error.name, detail: error.message, life: 5000 });
    console.error(error.message);
  }
}
