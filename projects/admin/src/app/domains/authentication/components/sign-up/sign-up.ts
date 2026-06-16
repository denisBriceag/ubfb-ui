import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, tap } from 'rxjs';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';
import { AutoFocus } from 'primeng/autofocus';
import { EMAIL_PATTERN } from '../../../../core/constants/patterns.const';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Roles } from '../../../../typings/role.enum';
import { UserStore } from '../../../../core/store/user.store';
import { SignUpFormModel, SignUpModel } from '../../../../core/services/auth/auth.model';
import { validatePassword } from '../../validators/validate-password.validator';
import { ERROR_MAP } from '../../../../core/constants/error-map.const';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { handleHttpError } from '../../../../shared/utils/rxjs.util';

@Component({
  selector: 'admin-sign-up',
  host: { class: 'w-full' },
  templateUrl: './sign-up.html',
  imports: [
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    FormsModule,
    InputText,
    Message,
    ReactiveFormsModule,
    RouterLink,
    Password,
    AutoFocus,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _notificationService = inject(NotificationService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _store = inject(UserStore);

  readonly loading = signal(false);

  readonly form = this._fb.group<SignUpFormModel>(
    {
      email: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      ),
      name: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ),
      surname: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ),
      password: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ),
      confirmPassword: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ),
      role: this._fb.control(Roles.USER, Validators.compose([Validators.required])),
    },
    { updateOn: 'blur', validators: validatePassword },
  );

  signUp(): void {
    const { email, name, surname, password, role } = this.form.value;

    this.loading.set(true);

    this._authService
      .signUp({ email, name, surname, password, role } as SignUpModel)
      .pipe(
        tap(({ accessToken }) => {
          this._store.updateUser(accessToken);
          void this._router.navigate(['/dashboard']);
        }),
        handleHttpError((error) => {
          if (error.errorCode === ERROR_MAP.SIGN_UP_CONFLICT) {
            this._notificationService.showToaster({
              type: 'error',
              title: error.message,
              message: 'An account with this email address already exists.',
            });
          }
        }),
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }
}
