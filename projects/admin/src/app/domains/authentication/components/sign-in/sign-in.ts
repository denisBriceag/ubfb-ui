import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { Password } from 'primeng/password';
import { AutoFocus } from 'primeng/autofocus';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { EMAIL_PATTERN } from '../../../../core/constants/patterns.const';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserStore } from '../../../../core/store/user.store';
import { SignInForm, SignInModel } from '../../../../core/services/auth/auth.model';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { ERROR_MAP } from '../../../../core/constants/error-map.const';
import { handleHttpError } from '../../../../shared/utils/rxjs.util';

@Component({
  selector: 'admin-sign-in',
  host: { class: 'w-full' },
  templateUrl: './sign-in.html',
  imports: [
    InputText,
    ButtonDirective,
    ReactiveFormsModule,
    ButtonLabel,
    ButtonIcon,
    Message,
    RouterLink,
    Password,
    AutoFocus,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignIn {
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _notificationService = inject(NotificationService);
  private readonly _store = inject(UserStore);
  private readonly _destroyRef = inject(DestroyRef);

  readonly loading = signal(false);

  readonly form: FormGroup<SignInForm> = this._fb.group(
    {
      email: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      ),
      password: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ),
    },
    { updateOn: 'blur' },
  );

  signIn() {
    this.loading.set(true);

    this._authService
      .signIn(this.form.value as SignInModel)
      .pipe(
        tap(({ accessToken }) => {
          this._store.updateUser(accessToken);
          void this._router.navigate(['/dashboard']);
        }),
        handleHttpError((error) => {
          if (error.errorCode === ERROR_MAP.INVALID_CREDENTIALS) {
            this._notificationService.showToaster({
              type: 'error',
              title: 'Invalid credentials',
              message: 'Wrong email or password.',
            });
          }
        }),
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }
}
