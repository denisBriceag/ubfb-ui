import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Injector,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { form, pattern, required, validate } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { finalize, map, Observable, pipe, Subscription, tap, UnaryFunction } from 'rxjs';

import { InputText } from 'primeng/inputtext';
import { Skeleton } from 'primeng/skeleton';
import { InputMaskDirective } from 'primeng/inputmask';
import { ButtonDirective, ButtonLabel } from 'primeng/button';

import { ContactsService } from './data/contacts.service';
import { MultiLanguageField } from '../../shared/components/form/multi-language-field/multi-language-field';
import {
  EMAIL_PATTERN,
  MD_PHONE_PATTERN,
  MD_ZIP_PATTERN,
} from '../../core/constants/patterns.const';

import { fullyLocalized } from '../../shared/validators/fully-localized.validator';
import { ContactsPayload, ContactsResponse } from './data/contacts.model';
import { Error } from '../../shared/components/error/error';
import { handleHttpErrorWithMessage } from '../../shared/utils/rxjs.util';
import { formHasChanged } from '../../shared/utils/signals.util';
import { UpdaterInfo } from '../../shell/updater/updater-info';
import { UpdaterData } from '../../typings/updater.type';
import { ControlErrors } from '../../shared/components/form/control-errors/control-errors';

@Component({
  selector: 'admin-contacts',
  templateUrl: './contacts.html',
  providers: [ContactsService],
  imports: [
    MultiLanguageField,
    InputText,
    InputMaskDirective,
    FormField,
    Skeleton,
    ButtonDirective,
    ButtonLabel,
    Error,
    UpdaterInfo,
    ControlErrors,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contacts implements OnInit {
  private readonly _contactsService = inject(ContactsService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _injector = inject(Injector);

  private readonly _serverSnapshot = signal<ContactsPayload | null>(null);
  private _getContactsSub!: Subscription;

  readonly isLoading = signal(false);
  readonly isSubmitting = signal(false);
  readonly isError = signal(false);
  readonly updater = signal<UpdaterData | null>(null);

  private readonly _model: WritableSignal<ContactsPayload> = signal({
    street: { en: '', ro: '', ru: '' },
    city: { en: '', ro: '', ru: '' },
    country: { en: '', ro: '', ru: '' },
    zip: '',
    secretaryPhone: '',
    salesPhone: '',
    email: '',
    version: 0,
  });

  readonly hasChanges = formHasChanged(this._model, this._serverSnapshot);

  readonly contactsForm = form(this._model, (f) => {
    validate(f.street, fullyLocalized);
    validate(f.city, fullyLocalized);
    validate(f.country, fullyLocalized);

    required(f.zip, { message: 'Zip phone is required' });
    pattern(f.zip, MD_ZIP_PATTERN, { message: 'Must be a valid Moldovan zip address' });

    required(f.secretaryPhone, { message: 'Secretary phone is required' });
    pattern(f.secretaryPhone, MD_PHONE_PATTERN, {
      message: 'Must be a valid Moldovan phone number (+373XXXXXXXX)',
    });

    required(f.salesPhone, { message: 'Sales phone is required' });
    pattern(f.salesPhone, MD_PHONE_PATTERN, {
      message: 'Must be a valid Moldovan phone number (+373XXXXXXXX)',
    });

    required(f.email, { message: 'Email phone is required' });
    pattern(f.email, EMAIL_PATTERN, { message: 'Must be a valid UBFB email address' });
  });

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this._getContactsSub?.unsubscribe();
    this.isLoading.set(true);
    this.isError.set(false);

    this._getContactsSub = this._contactsService
      .getContacts()
      .pipe(
        tap(({ updatedAt, updater }) => this.updater.set({ updatedAt, ...updater })),
        this.toContactsPayload(),
        tap((contact) => {
          this._model.set(contact);
          this._serverSnapshot.set(contact);
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        error: () => {
          this.isError.set(true);
          this.updater.set(null);
        },
      });
  }

  submitContacts(event: Event): void {
    event.preventDefault();

    this.isSubmitting.set(true);

    this._contactsService
      .updateContacts(this.contactsForm().value())
      .pipe(
        tap(({ updatedAt, updater }) => this.updater.set({ updatedAt, ...updater })),
        this.toContactsPayload(),
        tap((response) => {
          this._model.set(response);
          this._serverSnapshot.set(response);
        }),
        handleHttpErrorWithMessage(this._injector),
        finalize(() => {
          this.isSubmitting.set(false);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  private toContactsPayload(): UnaryFunction<
    Observable<ContactsResponse>,
    Observable<ContactsPayload>
  > {
    return pipe(
      map<ContactsResponse, ContactsPayload>(
        ({ street, city, country, zip, secretaryPhone, salesPhone, email, version }) => ({
          street,
          city,
          country,
          zip,
          secretaryPhone,
          salesPhone,
          email,
          version,
        }),
      ),
    );
  }
}
