import { Shell } from './shell/shell/shell';
import { authGuard } from './core/guards/auth/auth-guard';
import { UbfbRoute } from './typings/ubfb-route.type';

export const routes: UbfbRoute[] = [
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
        data: { title: 'Dashboard' },
      },
      {
        path: 'contacts',
        title: 'Contacts',
        loadComponent: () => import('./domains/contacts/contacts').then((m) => m.Contacts),
        data: { title: 'Contacts', breadcrumb: { title: 'Contacts', url: '/contacts' } },
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./domains/authentication/auth.routes').then((m) => m.authRoutes),
  },
  { path: '**', redirectTo: 'dashboard' },
];
