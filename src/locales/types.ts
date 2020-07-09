import { locales } from "@utils/translation/config";

export type Locale = typeof locales[number];

export type Languages = {
  [lng in Locale]?: Namespace;
};

export type Namespace = {
  [ns: string]: Strings;
};

export type Strings = { [key: string]: string | Strings };
