const REGISTER_PATH = "/user/register";

export function buildReferralRegisterUrl(
  code: string,
  origin?: string,
): string {
  const trimmedCode = code.trim();
  const baseOrigin =
    origin ?? (typeof window !== "undefined" ? window.location.origin : "");

  if (!baseOrigin || !trimmedCode) return "";

  const url = new URL(REGISTER_PATH, baseOrigin);
  url.searchParams.set("referralCode", trimmedCode);
  return url.toString();
}

export function getReferralCodeFromSearchParams(
  searchParams: URLSearchParams,
): string | null {
  const referralCode = searchParams.get("referralCode")?.trim();
  if (referralCode) return referralCode;

  const ref = searchParams.get("ref")?.trim();
  return ref || null;
}
