export const modifyPayloadWithFile = (payload: any) => {
  const obj = { ...payload };
  console.log(obj);
  const file = obj.admin["file"];
  delete obj["file"];
  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append("data", data);
  formData.append("file", file as Blob);
  return formData;
};
