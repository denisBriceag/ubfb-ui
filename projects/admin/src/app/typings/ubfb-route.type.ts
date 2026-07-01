import { Route } from '@angular/router';

export type UbfbBreadcrumb = {
  title: string;
  url: string;
};

export interface UbfbRouteData {
  title?: string;
  breadcrumb?: UbfbBreadcrumb;
  [key: string | symbol]: unknown;
}

export interface UbfbRoute extends Route {
  data?: UbfbRouteData;
  children?: UbfbRoute[];
}
