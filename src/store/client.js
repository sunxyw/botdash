import { defineStore } from "pinia";
import { getClientList } from "../api/client";

export const useClientStore = defineStore("client", {
  state: () => ({
    count: 0,
    list: [],
  }),
  actions: {
    async loadClientList() {
      const list = await getClientList();
      this.list = list;
      this.count = list.length;
    },
  },
});
