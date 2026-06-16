import { DestroyRef, DOCUMENT, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { fromEvent, map, startWith, tap } from 'rxjs';

import { UBFB_LOCAL_STORAGE } from '../../tokens/local-storage.token';
import { storageKeys } from '../../constants/storage-keys.const';
import { UbfbTheme } from '../../../typings/theme.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _localStorage = inject<Storage>(UBFB_LOCAL_STORAGE);
  private readonly _document = inject(DOCUMENT);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _preferenceQuery = matchMedia('(prefers-color-scheme: light)');

  currentTheme!: WritableSignal<UbfbTheme>;

  toggleTheme(theme: UbfbTheme): void {
    this._setTheme(theme, true);
  }

  initTheme(): void {
    fromEvent<MediaQueryList>(this._preferenceQuery, 'change')
      .pipe(
        startWith(this._preferenceQuery),
        map<MediaQueryList, UbfbTheme>((query: MediaQueryList) =>
          query.matches ? 'light' : 'dark',
        ),
        tap((theme) => {
          const existingSetup = this._localStorage.getItem(
            storageKeys.ubfb_theme,
          ) as UbfbTheme | null;

          this._setTheme(existingSetup ?? theme, !!existingSetup);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  private _setTheme(theme: UbfbTheme, fromStorage = false): void {
    const element = this._document.querySelector('html');

    element?.classList[theme === 'dark' ? 'add' : 'remove']('p-dark');

    if (!this.currentTheme) this.currentTheme = signal<UbfbTheme>(theme);
    else this.currentTheme.set(theme);

    if (fromStorage) this._localStorage.setItem(storageKeys.ubfb_theme, theme);
  }
}
