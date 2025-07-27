import { getSession } from "next-auth/react";

export async function getAccessToken() {
  const session = await getSession();
  const accessToken = session?.accessToken;
  if (!accessToken) throw new Error("No access token");
  return accessToken;
}
