import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaderStore } from '../../store/loader.store';

export const globalLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _store = inject(LoaderStore);

  _store.increment();

  return next(req).pipe(finalize(() => _store.decrement()));
};
