import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { jwtDecode } from '../../shared/utils/jwt.util';
import { computed } from '@angular/core';
import { Roles } from '../../typings/role.enum';

type UserState = {
  email: string;
  name: string;
  surname: string;
  role: Roles | null;
  accessToken: string;
};

const initialState: UserState = {
  email: '',
  name: '',
  surname: '',
  role: null,
  accessToken: '',
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ name, surname, role }) => ({
    initials: computed(() =>
      name() && surname() ? `${name().charAt(0)} ${surname().charAt(0)}` : '',
    ),
    isAdmin: computed(() => role() === Roles.ADMIN),
    isSuperAdmin: computed(() => role() === Roles.SUPER_ADMIN),
  })),
  withMethods((store) => ({
    updateUser(accessToken: string): void {
      const user = jwtDecode<UserState>(accessToken);

      if (user) {
        patchState(store, (state) => ({
          ...state,
          email: user.email,
          name: user.name,
          surname: user.surname,
          role: user.role,
          accessToken,
        }));
      }
    },
    removeUser(): void {
      patchState(store, () => ({ ...initialState }));
    },
  })),
);
