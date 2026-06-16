import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { jwtDecode } from '../../shared/utils/jwt.util';
import { computed } from '@angular/core';

type UserState = {
  email: string;
  name: string;
  surname: string;
  accessToken: string;
};

const initialState: UserState = {
  email: '',
  name: '',
  surname: '',
  accessToken: '',
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ name, surname }) => ({
    initials: computed(() =>
      name() && surname() ? `${name().charAt(0)} ${surname().charAt(0)}` : '',
    ),
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
          accessToken,
        }));
      }
    },
    removeUser(): void {
      patchState(store, () => ({ ...initialState }));
    },
  })),
);
