import { Routes } from '@angular/router';
import { Shell } from './shell/shell/shell';
import { authGuard } from './core/guards/auth/auth-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () =>
          import('./domains/dashboard/dashboard-page').then((m) => m.DashboardPage),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./domains/authentication/auth.routes').then((m) => m.authRoutes),
  },
  { path: '**', redirectTo: 'dashboard' },
];
