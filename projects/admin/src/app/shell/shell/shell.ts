import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from '../navbar/navbar';
import { Sidenav } from '../sidenav/sidenav';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { Title } from '../title/title';

@Component({
  selector: 'admin-shell',
  template: `
    <div class="h-screen flex relative lg:static bg-surface-0 dark:bg-surface-950">
      <aside admin-sidenav></aside>

      <div class="flex flex-col flex-1 min-w-0 min-h-0">
        <header admin-navbar></header>

        <main class="flex-1 p-4 overflow-y-auto" aria-label="Main content">
          <admin-breadcrumbs class="block pb-6" />

          <admin-title />

          <router-outlet />
        </main>
      </div>
    </div>
  `,
  imports: [Navbar, RouterOutlet, Sidenav, Breadcrumbs, Title],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {}
