export const getClientList = async () => {
  const clients = await window.$vueApp.$http.get(
    "http://127.0.0.1:4523/m1/1379808-0-default/clients"
  );

  return clients.data.data.clients;
};
