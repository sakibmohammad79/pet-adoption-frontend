"use server";
export const AdopterRegister = async (formValue: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-adopter`,
    {
      method: "POST",
      body: formValue,
      cache: "no-store",
    }
  );

  const adopterInfo = await res.json();
  return adopterInfo;
};
