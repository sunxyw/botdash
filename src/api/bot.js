export const getBotList = async () => {
  const bots = await window.$vueApp.$http.get(
    "http://127.0.0.1:4523/m1/1379808-0-default/bots"
  );

  return bots.data.data.bots;
};
