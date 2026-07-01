import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';

const PREFIX = 'UBFB Admin Panel |';

@Injectable({
  providedIn: 'root',
})
export class UbfbAdminTitleStrategy extends TitleStrategy {
  private readonly _titleService = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const routeTitle = this.buildTitle(snapshot);

    this._titleService.setTitle(routeTitle ? `${PREFIX} ${routeTitle}` : PREFIX);
  }
}
