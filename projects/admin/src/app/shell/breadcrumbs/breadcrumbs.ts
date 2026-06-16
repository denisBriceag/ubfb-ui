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
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, startWith, tap } from 'rxjs';

@Component({
  selector: 'admin-breadcrumbs',
  templateUrl: './breadcrumbs.html',
  imports: [Breadcrumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumbs implements OnInit {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);

  readonly home: MenuItem = { label: 'Dashboard', url: '#' };
  readonly items = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this._handleRouterEvents();
  }

  private _handleRouterEvents(): void {
    this._router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(new NavigationEnd(0, this._router.url, this._router.url)),
        tap(() => {
          console.log(this._route.snapshot.root);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }
}
