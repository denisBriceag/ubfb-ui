import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBar } from 'primeng/progressbar';
import { LoaderStore } from './core/store/loader.store';
import { ThemeService } from './core/services/theme/theme.service';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'admin-root',
  host: {
    class: '@apply bg-surface-50 dark:bg-surface-950',
  },
  template: `
    @if (store.httpLoading()) {
      <p-progressbar mode="indeterminate" [pt]="{ root: { class: 'h-[4px]' } }"></p-progressbar>
    }

    <p-toast position="bottom-center" life="5000" />

    <router-outlet />
  `,
  imports: [RouterOutlet, ProgressBar, Toast],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly _themeService = inject(ThemeService);
  readonly store = inject(LoaderStore);

  constructor() {
    this._themeService.initTheme();
  }
}
