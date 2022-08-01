import { defineStore } from "pinia";
import { getBotList } from "../api/bot";

export const useBotStore = defineStore("bot", {
  state: () => ({
    count: 0,
    list: [],
  }),
  actions: {
    async loadBotList() {
      const list = await getBotList();
      this.list = list;
      this.count = list.length;
    },
  },
});
