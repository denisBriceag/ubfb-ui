import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';

@Component({
  selector: 'admin-error',
  templateUrl: './error.html',
  imports: [ButtonDirective, ButtonIcon, ButtonLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error {
  title = input('Something went wrong');
  subtitle = input("Sorry, we couldn't load the data.");
  withRefresh = input(false);

  refresh = output<void>();
}
