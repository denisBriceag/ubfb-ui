import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { form, FormField, FormValueControl, disabled, required } from '@angular/forms/signals';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';

import { Language } from '../../../../typings/language.type';

@Component({
  selector: 'admin-multi-language-field',
  templateUrl: './multi-language-field.html',
  imports: [
    Tabs,
    Tab,
    TabList,
    UpperCasePipe,
    TabPanels,
    TabPanel,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    FormField,
    Message,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiLanguageField implements FormValueControl<Record<Language, string>> {
  readonly label = input('');
  readonly disabled = input(false);
  readonly invalid = input(false);

  readonly languages: Language[] = ['en', 'ro', 'ru'];
  readonly value = model<Record<Language, string>>({
    en: '',
    ro: '',
    ru: '',
  });

  readonly languageForm = form(this.value, (f) => {
    for (const lang of this.languages) {
      required(f[lang]);
      disabled(f[lang], () => this.disabled());
    }
  });

  currentTab = 'en';
}
