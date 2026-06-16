import { PrimeNGConfigType } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const primengConfig: PrimeNGConfigType = {
  ripple: true,
  overlayAppendTo: 'body',
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.p-dark',
      cssLayer: {
        name: 'primeng',
        order: 'theme, base, primeng, overrides',
      },
    },
  },
};
