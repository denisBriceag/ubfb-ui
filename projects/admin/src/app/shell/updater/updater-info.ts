import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { UserStore } from '../../core/store/user.store';
import { UpdaterData } from '../../typings/updater.type';

@Component({
  selector: 'admin-updater-info',
  template: `
    <div class="flex items-center gap-1.5 text-sm text-surface-500 dark:text-surface-400">
      <span>Last updated by: </span>

      @if (store.isAdmin() || store.isSuperAdmin()) {
        <a [routerLink]="['/users', updater().id]" class="text-primary-500 hover:underline">
          {{ updater().email }}
        </a>
      } @else {
        <span>{{ updater().email }}</span>
      }

      <span aria-hidden="true">on</span>

      <time [dateTime]="updater().updatedAt">{{
        updater().updatedAt | date: 'd MMM y, HH:mm'
      }}</time>
    </div>
  `,
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdaterInfo {
  readonly store = inject(UserStore);
  readonly updater = input.required<UpdaterData>();
}
