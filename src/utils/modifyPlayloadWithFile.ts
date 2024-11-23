export const modifyPayloadWithFile = (payload: any) => {
  const obj = { ...payload };

  // Find the key containing 'file'
  const fileKey = Object.keys(obj).find((key) => obj[key]?.file);
  if (!fileKey) {
    throw new Error("File property not found in payload");
  }
  const file = obj[fileKey]["file"];
  delete obj[fileKey]["file"];

  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append("data", data);
  formData.append("file", file as Blob);

  return formData;
};
