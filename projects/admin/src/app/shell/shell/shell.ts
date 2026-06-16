import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Sidenav } from '../sidenav/sidenav';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';

@Component({
  selector: 'admin-shell',
  template: `
    <div class="min-h-screen flex relative lg:static bg-surface-0 dark:bg-surface-950">
      <aside admin-sidenav></aside>

      <div class="flex flex-col flex-1 min-w-0">
        <header admin-navbar></header>

        <main class="flex-1 p-4 overflow-auto" aria-label="Main content">
          <admin-breadcrumbs class="block pb-6" />

          <router-outlet />
        </main>
      </div>
    </div>
  `,
  imports: [Navbar, RouterOutlet, Sidenav, Breadcrumbs],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {}
