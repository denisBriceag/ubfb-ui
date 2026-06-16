import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotificationType } from '../../../typings/notification.type';

export type NotificationConfig = {
  type: NotificationType;
  title: string;
  message?: string;
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _messages = inject(MessageService);

  showToaster({ type, message, title }: NotificationConfig): void {
    this._messages.add({
      severity: type,
      summary: title,
      detail: message,
      sticky: true,
      closable: true,
    });
  }
}
