"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const setCookies = async (token: string) => {
  (await cookies()).set("accessToken", token);
};

export const Logout = async () => {
  (await cookies()).delete("accessToken");
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const getCurrentToken = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (accessToken) return accessToken;
  else return null;
};
