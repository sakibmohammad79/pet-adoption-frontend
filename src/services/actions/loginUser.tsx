"use server";

import { ILoginFormData } from "@/app/login/page";

export const UserLogin = async (value: ILoginFormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }
  );
  const userInfo = await res.json();
  return userInfo;
};