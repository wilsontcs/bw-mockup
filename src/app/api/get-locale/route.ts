import { cookies } from "next/headers";
import { CookieKey } from "../../config/constant";
import { defaultLocale } from "../../config/locale";

export async function GET() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(CookieKey.Locale)?.value || defaultLocale;

  return new Response(JSON.stringify({ locale }), {
    headers: { "Content-Type": "application/json" },
  });
}
