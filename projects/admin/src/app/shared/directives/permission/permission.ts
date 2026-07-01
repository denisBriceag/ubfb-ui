import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

import { Roles } from '../../../typings/role.enum';
import { UserStore } from '../../../core/store/user.store';

@Directive({
  selector: '[adminPermission]',
})
export class Permission {
  private readonly _store = inject(UserStore);
  private readonly _templateRef = inject(TemplateRef<Permission>);
  private readonly _viewContainer = inject(ViewContainerRef);

  readonly adminPermission = input.required<Roles>();

  constructor() {
    effect(() => {
      if (this._store.role() === this.adminPermission()) {
        this._viewContainer.clear();
        this._viewContainer.createEmbeddedView(this._templateRef);

        return;
      }

      this._viewContainer.clear();
    });
  }
}
