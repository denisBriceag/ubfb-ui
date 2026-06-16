import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin-auth-page',
  template: `
    <div
      class="h-full flex justify-center items-center bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-20 lg:px-80"
    >
      <router-outlet />
    </div>
  `,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPage {}
