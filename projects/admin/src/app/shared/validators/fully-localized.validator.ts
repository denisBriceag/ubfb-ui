import { Language } from '../../typings/language.type';

export function fullyLocalized(ctx: { value: () => Record<Language, string> }) {
  const allFilled = Object.values(ctx.value()).every((v) => v.trim().length > 0);

  return allFilled
    ? null
    : { kind: 'fullyLocalized', message: 'All language variants are required' };
}
