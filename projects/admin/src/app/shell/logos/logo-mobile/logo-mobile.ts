import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'admin-logo-mobile',
  host: {},
  templateUrl: './logo-mobile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoMobile {}
