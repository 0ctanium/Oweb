import { locales } from './config';
import { Locale } from '@locales/types';

export default function isLocale(tested: Locale): boolean {
  return locales.some((locale) => locale === tested);
}
