import localeMiddleware from '@utils/translation/api/localeMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void =>
  localeMiddleware(req, res);
