import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterDataService } from '../../core/services/router-data/router-data.service';

@Component({
  selector: 'admin-title',
  imports: [AsyncPipe],
  template: `
    @if (routerDataService.activeRouterData$ | async; as data) {
      <div class="text-2xl leading-tight font-semibold text-surface-900 dark:text-surface-0 mb-8">
        {{ data?.['title'] }}
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Title {
  readonly routerDataService = inject(RouterDataService);
}
