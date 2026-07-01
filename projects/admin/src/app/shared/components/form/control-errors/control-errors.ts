import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

import { Message } from 'primeng/message';

@Component({
  selector: 'admin-control-errors',
  host: { class: 'empty:hidden' },
  template: `
    @if (field().touched() && field().invalid()) {
      @for (error of field().errors(); track error.kind) {
        <p-message severity="error" size="small" variant="simple">{{ error.message }}</p-message>
      }

      <ng-content select="'custom error'"></ng-content>
    }
  `,
  imports: [Message],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrors {
  field = input.required<FieldState<unknown>>();
}
