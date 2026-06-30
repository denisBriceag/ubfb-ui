import { computed, Signal } from '@angular/core';

export function formHasChanged<T extends object>(
  model: Signal<T>,
  snapshot: Signal<T | null>,
): Signal<boolean> {
  return computed(() => {
    const serverSnapshot = snapshot();
    const currentValue = model();

    if (!snapshot()) return false;

    return JSON.stringify(currentValue) !== JSON.stringify(serverSnapshot);
  });
}
