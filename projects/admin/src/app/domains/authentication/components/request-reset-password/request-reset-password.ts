import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { EMAIL_PATTERN } from '../../../../core/constants/patterns.const';
import {
  ResetPasswordRequestForm,
  ResetPasswordRequestModel,
} from '../../../../core/services/auth/auth.model';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationService } from '../../../../core/services/notification/notification.service';

@Component({
  selector: 'admin-request-reset-password',
  host: { class: 'w-full' },
  templateUrl: './request-reset-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    FormsModule,
    InputText,
    Message,
    ReactiveFormsModule,
  ],
})
export class RequestResetPassword {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _authService = inject(AuthService);
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _notificationService = inject(NotificationService);

  readonly loading = signal(false);

  readonly form: FormGroup<ResetPasswordRequestForm> = this._fb.group(
    {
      email: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      ),
    },
    { updateOn: 'blur' },
  );

  requestPasswordReset(): void {
    this.loading.set(true);

    this._authService
      .requestPasswordReset(this.form.value as ResetPasswordRequestModel)
      .pipe(
        tap(() =>
          this._notificationService.showToaster({
            type: 'success',
            title: 'Request submitted!',
            message: 'A link to create a new password was sent to your email',
          }),
        ),
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }
}
