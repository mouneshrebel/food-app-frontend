const Image = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  const Data = new Promise((res, rej) => {
    reader.onload = () => res(reader.result);
    reader.onerror = (e) => rej.e;
  });
  return Data;
};

export { Image };
