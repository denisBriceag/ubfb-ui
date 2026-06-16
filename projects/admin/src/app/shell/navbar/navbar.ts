import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';

import { StyleClass } from 'primeng/styleclass';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';

import { ThemeService } from '../../core/services/theme/theme.service';
import { UserStore } from '../../core/store/user.store';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../core/services/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[admin-navbar]',
  styles: [
    `
      :host {
        @apply w-full h-fit;
      }
    `,
  ],
  templateUrl: './navbar.html',
  imports: [StyleClass, Avatar, Button, MenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  private readonly _authService = inject(AuthService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  readonly themeService = inject(ThemeService);
  readonly store = inject(UserStore);
  readonly menuItems: MenuItem[] = [
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: this._signOut.bind(this),
    },
  ];

  private _signOut(): void {
    this._authService
      .signOut()
      .pipe(
        tap(() => {
          this.store.removeUser();
          void this._router.navigate(['auth']);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }
}
