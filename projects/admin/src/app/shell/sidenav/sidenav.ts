import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LogoMobile } from '../logos/logo-mobile/logo-mobile';
import { LogoDesktop } from '../logos/logo-desktop/logo-desktop';

type SidenavOption = {
  label: string;
  iconClass: string;
  link: string;
  iconName?: string;
};

@Component({
  selector: 'admin-sidenav',
  templateUrl: './sidenav.html',
  imports: [LogoMobile, LogoDesktop, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidenav {
  readonly options: SidenavOption[] = [
    {
      label: 'Dashboard',
      link: '/',
      iconClass: 'pi pi-home',
    },
    {
      label: 'Contacts',
      link: 'contacts',
      iconClass: 'pi pi-address-book',
    },
    {
      label: 'Brands',
      link: 'brands',
      iconClass: 'mat-icons-outlined',
      iconName: 'verified',
    },
    {
      label: 'Categories',
      link: 'categories',
      iconClass: 'mat-icons-outlined',
      iconName: 'category',
    },
    {
      label: 'Countries',
      link: 'countries',
      iconClass: 'mat-icons-outlined',
      iconName: 'flag',
    },
    {
      label: 'Packaging types',
      link: 'packaging-types',
      iconClass: 'pi pi-box',
    },
    {
      label: 'Products',
      link: 'products',
      iconClass: 'mat-icons-outlined',
      iconName: 'liquor',
    },
    {
      label: 'Product collections',
      link: 'product-collections',
      iconClass: 'mat-icons-outlined',
      iconName: 'photo_library',
    },
  ];
}
