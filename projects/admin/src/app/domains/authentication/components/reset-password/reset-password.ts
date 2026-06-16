import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, tap } from 'rxjs';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { Message } from 'primeng/message';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ResetPasswordForm, ResetPasswordModel } from '../../../../core/services/auth/auth.model';
import { validatePassword } from '../../validators/validate-password.validator';
import { Password } from 'primeng/password';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { ERROR_MAP } from '../../../../core/constants/error-map.const';
import { handleHttpError } from '../../../../shared/utils/rxjs.util';

@Component({
  selector: 'admin-reset-password',
  host: { class: 'w-full' },
  templateUrl: './reset-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    FormsModule,
    Message,
    ReactiveFormsModule,
    Password,
  ],
})
export class ResetPassword {
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _notificationService = inject(NotificationService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _route = inject(ActivatedRoute);

  readonly loading = signal(false);

  readonly form: FormGroup<ResetPasswordForm> = this._fb.group(
    {
      token: this._fb.control(
        this._route.snapshot.queryParamMap.get('token') ?? '',
        Validators.required,
      ),
      password: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ),
      confirmPassword: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ),
    },
    { updateOn: 'blur', validators: validatePassword },
  );

  resetPassword(): void {
    const { token, password } = this.form.value;

    this.loading.set(true);

    this._authService
      .resetPassword({ token, newPassword: password } as ResetPasswordModel)
      .pipe(
        tap(() => void this._router.navigate(['/auth/sign-in'])),
        handleHttpError((error) => {
          if (error.errorCode === ERROR_MAP.INVALID_RESET_TOKEN) {
            this._notificationService.showToaster({
              type: 'error',
              title: 'Link expired',
              message: 'This reset link has expired or has already been used.',
            });
          }
        }),
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }
}
