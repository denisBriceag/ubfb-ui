import { Routes } from '@angular/router';
import { AuthPage } from './auth-page';
import { SignIn } from './components/sign-in/sign-in';
import { SignUp } from './components/sign-up/sign-up';
import { RequestResetPassword } from './components/request-reset-password/request-reset-password';
import { ResetPassword } from './components/reset-password/reset-password';
import { resetPasswordGuard } from './guards/reset-password/reset-password-guard';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
      { path: 'sign-in', title: 'Sign in', component: SignIn },
      { path: 'sign-up', title: 'Sign up', component: SignUp },
      {
        path: 'request-reset-password',
        title: 'Request reset password',
        component: RequestResetPassword,
      },
      {
        path: 'reset-password',
        title: 'Reset password',
        component: ResetPassword,
        canActivate: [resetPasswordGuard],
      },
    ],
  },
];
