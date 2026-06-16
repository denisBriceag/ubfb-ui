import { HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, pipe } from 'rxjs';
import { GenericHttpError } from '../../typings/error.type';

export function handleHttpError(cb: (error: GenericHttpError) => void) {
  return pipe(
    catchError((error: HttpErrorResponse) => {
      cb(error.error as GenericHttpError);

      return EMPTY;
    }),
  );
}
