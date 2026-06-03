import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Sidenav } from './shell/sidenav/sidenav';
import { Navbar } from './shell/navbar/navbar';

@Component({
  selector: 'admin-root',
  template: `
    <main
      class="resize-container-9 min-h-screen flex relative lg:static bg-surface-0 dark:bg-surface-950"
    >
      <admin-sidenav />

      <admin-navbar />

      <router-outlet />
    </main>
  `,
  imports: [RouterOutlet, Sidenav, Navbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
