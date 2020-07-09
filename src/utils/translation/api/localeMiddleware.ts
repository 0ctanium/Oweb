import headerLanguage from './headerLanguage';
import redirect from './redirect';
import { defaultLocale } from '../config';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const allowedLocales = [
    { name: 'de-DE', locale: 'de' },
    { name: 'de', locale: 'de' },
    { name: 'en-AU', locale: 'en' },
    { name: 'en-IN', locale: 'en' },
    { name: 'en-CA', locale: 'en' },
    { name: 'en-NZ', locale: 'en' },
    { name: 'en-US', locale: 'en' },
    { name: 'en-ZA', locale: 'en' },
    { name: 'en-GB', locale: 'en' },
    { name: 'en', locale: 'en' },
  ];

  const detections = headerLanguage(req);

  let found;

  if (detections && detections.length) {
    detections.forEach((language) => {
      if (found || typeof language !== 'string') return;

      const lookedUpLocale = allowedLocales.find(
        (allowedLocale) => allowedLocale.name === language
      );

      if (lookedUpLocale) {
        found = lookedUpLocale.locale;
      }
    });
  }

  if (!found) {
    found = defaultLocale;
  }

  if (req.url === '/') {
    return redirect(res, 302, `/${found}`);
  }

  if (req.url.charAt(0) === '/' && req.url.charAt(1) === '?') {
    return redirect(res, 302, `/${found}${req.url.slice(1)}`);
  }

  return redirect(res, 302, `/${found}${req.url}`);
};
