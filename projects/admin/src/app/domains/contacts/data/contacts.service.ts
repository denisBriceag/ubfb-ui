import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UBFB_ENV } from '../../../core/tokens/env.token';
import { ContactsPayload, ContactsResponse } from './contacts.model';

@Injectable()
export class ContactsService {
  private readonly _env = inject(UBFB_ENV);
  private readonly _http = inject(HttpClient);

  getContacts(): Observable<ContactsResponse> {
    return this._http.get<ContactsResponse>(`${this._env.serverBaseUrl}/contacts`);
  }

  createContacts(payload: ContactsPayload) {
    return this._http.post<ContactsResponse>(`${this._env.serverBaseUrl}/contacts`, payload);
  }

  updateContacts(payload: ContactsPayload) {
    return this._http.patch<ContactsResponse>(`${this._env.serverBaseUrl}/contacts`, payload);
  }
}
