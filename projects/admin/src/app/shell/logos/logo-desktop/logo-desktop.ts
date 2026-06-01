import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'admin-logo-desktop',
  host: {},
  templateUrl: './logo-desktop.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoDesktop {}
