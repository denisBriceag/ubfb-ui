import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {}
