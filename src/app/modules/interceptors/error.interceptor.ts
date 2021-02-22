import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {

  constructor(private messageService: MessageService, private zone: NgZone) { }

  handleError(error: Error | HttpErrorResponse) {
    const life = 10000;
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        this.zone.run(() => this.messageService.add({ severity: 'error', summary: 'Network error', detail: 'You are currently offline', life }));
      } else if (!error.status) {
        this.zone.run(() => this.messageService.add({ severity: 'error', summary: 'Unknown network error', detail: error.name, life }));
      }
    } else {
      this.zone.run(() => this.messageService.add({ severity: 'error', summary: error.name, detail: error.message, life }));
    }
  }
}
