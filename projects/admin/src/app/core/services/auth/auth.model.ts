import type { FormControl } from '@angular/forms';
import { Roles } from '../../../typings/role.enum';

export type AccessToken = { accessToken: string };

export type SignInForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

export type ResetPasswordRequestForm = {
  email: FormControl<string>;
};

export type ResetPasswordForm = {
  token: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
};

export type SignUpFormModel = {
  name: FormControl<string>;
  surname: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  role: FormControl<Roles.USER>;
};

export type SignInModel = {
  email: string;
  password: string;
};

export type SignUpModel = {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: Roles;
};

export type ResetPasswordRequestModel = {
  email: string;
};

export type ResetPasswordModel = {
  token: string;
  newPassword: string;
};
