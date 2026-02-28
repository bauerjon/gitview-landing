type UTMParams = Partial<{
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
}>;

const DEFAULT_APP_BASE_URL = "https://app.gitview.com";

export function getAppBaseUrl() {
  const env = process.env.NEXT_PUBLIC_APP_BASE_URL;
  return env?.trim() ? env.trim().replace(/\/+$/, "") : DEFAULT_APP_BASE_URL;
}

export function appUrl(pathname = "/", params?: Record<string, string>) {
  const base = getAppBaseUrl();
  const url = new URL(pathname, base);
  for (const [key, value] of Object.entries(params ?? {})) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

export function appUrlWithUtm(
  pathname: string,
  utm: UTMParams & { utm_source?: string } = {}
) {
  return appUrl(pathname, {
    utm_source: utm.utm_source ?? "landing",
    ...(utm.utm_medium ? { utm_medium: utm.utm_medium } : {}),
    ...(utm.utm_campaign ? { utm_campaign: utm.utm_campaign } : {}),
    ...(utm.utm_content ? { utm_content: utm.utm_content } : {}),
  });
}

export const APP_LINKS = {
  login: () => appUrl("/users/sign_in"),
  signup: () => appUrlWithUtm("/users/sign_up", { utm_source: "landing" }),
};
