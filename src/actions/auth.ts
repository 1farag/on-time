"use server";

import { cookies } from "next/headers";

export async function handleLogout() {
  const cookieStore = await cookies();

  cookieStore.delete("UserToken");
  cookieStore.delete("UserRefreshToken");
  cookieStore.delete("AdminToken");
  cookieStore.delete("AdminRefreshToken");

  return "/admin/login";
}
