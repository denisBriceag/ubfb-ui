import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { StyleClass } from 'primeng/styleclass';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';

import { ThemeService } from '../../core/services/theme/theme.service';

@Component({
  selector: 'admin-navbar',
  imports: [StyleClass, Avatar, Button, AsyncPipe],
  styles: [
    `
      :host {
        @apply w-full h-fit;
      }
    `,
  ],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  readonly themeService = inject(ThemeService);
}
