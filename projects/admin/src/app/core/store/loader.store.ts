import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

type GlobalLoader = {
  activeRequests: number;
};

const initialState: GlobalLoader = {
  activeRequests: 0,
};

export const LoaderStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ activeRequests }) => ({
    httpLoading: computed(() => activeRequests() > 0),
  })),
  withMethods((store) => ({
    increment(): void {
      patchState(store, (state) => ({ activeRequests: state.activeRequests + 1 }));
    },
    decrement(): void {
      patchState(store, (state) => ({ activeRequests: Math.max(0, state.activeRequests - 1) }));
    },
  })),
);
