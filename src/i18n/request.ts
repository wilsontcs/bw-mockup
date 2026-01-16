import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';
import { CookieKey } from '../app/config/constant';

 
export default getRequestConfig(async () => {
  const cookieStore = await cookies();

  const locale = cookieStore.get(CookieKey.Locale)?.value || "";


  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
