import { inject, Injector, runInInjectionContext } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, pipe } from 'rxjs';

import { GenericHttpError } from '../../typings/error.type';
import { NotificationService } from '../../core/services/notification/notification.service';
import { ERROR_DESCRIPTION } from '../../core/constants/error-description.const';
import { ERROR_TITLE } from '../../core/constants/error-title.const';

export function handleHttpError(cb: (error: GenericHttpError) => void) {
  return pipe(
    catchError((error: HttpErrorResponse) => {
      cb(error.error as GenericHttpError);

      return EMPTY;
    }),
  );
}

export function handleHttpErrorWithMessage(injector: Injector) {
  return pipe(
    catchError((error: HttpErrorResponse) => {
      runInInjectionContext(injector, () => {
        const _notificationService = inject(NotificationService);
        const errorObject = error.error as GenericHttpError | null;

        if (errorObject?.errorCode && errorObject.message) {
          _notificationService.showToaster({
            type: 'error',
            title:
              errorObject.errorCode in ERROR_TITLE ? ERROR_TITLE[errorObject.errorCode] : 'Error',
            message:
              errorObject.errorCode in ERROR_DESCRIPTION
                ? ERROR_DESCRIPTION[errorObject.errorCode]
                : 'Failed to perform the operation. Please try again.',
          });
        } else {
          _notificationService.showToaster({
            type: 'error',
            title: 'ERROR',
            message: 'Failed to perform the operation. Please try again.',
          });
        }
      });

      return EMPTY;
    }),
  );
}
