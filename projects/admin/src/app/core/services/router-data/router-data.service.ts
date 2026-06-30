import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, shareReplay, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterDataService {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  private readonly _routerEvents$ = this._router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith(new NavigationEnd(0, this._router.url, this._router.url)),
    shareReplay(),
  );

  readonly activeRouterData$ = this._routerEvents$.pipe(
    map(() => this._route.children[0].children[0].snapshot.data),
  );
}
