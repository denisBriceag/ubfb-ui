import { Language } from '../../../typings/language.type';
import { BaseResponse } from '../../../typings/base-response.model';

export interface ContactsPayload {
  street: Record<Language, string>;
  version: number;
  city: Record<Language, string>;
  country: Record<Language, string>;
  zip: string;
  secretaryPhone: string;
  salesPhone: string;
  email: string;
}

export interface ContactsResponse extends BaseResponse {
  singleton: 1;
  street: Record<Language, string>;
  city: Record<Language, string>;
  country: Record<Language, string>;
  zip: string;
  secretaryPhone: string;
  salesPhone: string;
  email: string;
}
