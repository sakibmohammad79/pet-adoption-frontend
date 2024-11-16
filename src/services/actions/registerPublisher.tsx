"use server";
export const PublisherRegister = async (formValue: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-publisher`,
    {
      method: "POST",
      body: formValue,
      cache: "no-store",
    }
  );

  const publisherInfo = await res.json();
  return publisherInfo;
};
