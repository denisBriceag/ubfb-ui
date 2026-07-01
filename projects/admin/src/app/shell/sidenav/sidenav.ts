import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LogoMobile } from '../logos/logo-mobile/logo-mobile';
import { LogoDesktop } from '../logos/logo-desktop/logo-desktop';
import { Roles } from '../../typings/role.enum';
import { Permission } from '../../shared/directives/permission/permission';

interface SidenavOption {
  label: string;
  iconClass: string;
  link: string;
  iconName?: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'aside[admin-sidenav]',
  templateUrl: './sidenav.html',
  imports: [LogoMobile, LogoDesktop, RouterLink, Permission, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidenav {
  readonly Roles = Roles;
  readonly options: SidenavOption[] = [
    {
      label: 'Dashboard',
      link: '/dashboard',
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
