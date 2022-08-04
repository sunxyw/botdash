import api from ".";

export const getBotList = async () => {
  const bots = await api.get("/bots");

  return bots.data.data.bots;
};
