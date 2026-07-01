import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, startWith, tap } from 'rxjs';
import { UbfbRouteData } from '../../typings/ubfb-route.type';

@Component({
  selector: 'admin-breadcrumbs',
  templateUrl: './breadcrumbs.html',
  imports: [Breadcrumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumbs implements OnInit {
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  readonly home: MenuItem = { label: 'Dashboard', routerLink: '/dashboard' };
  readonly items = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(new NavigationEnd(0, this._router.url, this._router.url)),
        tap(() => this.items.set(this._buildBreadcrumbs(this._router.routerState.snapshot.root))),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  private _buildBreadcrumbs(route: ActivatedRouteSnapshot): MenuItem[] {
    const items: MenuItem[] = [];
    let current: ActivatedRouteSnapshot | null = route;

    while (current) {
      const breadcrumb = (current.data as UbfbRouteData).breadcrumb;

      if (breadcrumb) {
        items.push({ label: breadcrumb.title, routerLink: breadcrumb.url });
      }

      current = current.children[0] ?? null;
    }

    return items;
  }
}
