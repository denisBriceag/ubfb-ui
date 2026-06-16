import type { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export function validatePassword<
  T extends FormGroup<{ password: FormControl<string>; confirmPassword: FormControl<string> }>,
>(group: AbstractControl): ValidationErrors | null {
  const password = (group as T).controls.password.value;
  const confirmPassword = (group as T).controls.confirmPassword.value;

  return password !== confirmPassword ? { passwordMissMatch: true } : null;
}
