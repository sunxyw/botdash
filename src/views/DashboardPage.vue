<template>
  <div>
    <!-- 统计组件 -->
    <a-row :gutter="24">
      <a-col
        :span="24"
        :lg="12"
        :xl="6"
        class="mb-24"
        v-for="(stat, index) in stats"
        :key="index"
      >
        <!-- 统计项 -->
        <WidgetCounter
          :title="stat.title"
          :value="stat.value"
          :prefix="stat.prefix"
          :suffix="stat.suffix"
          :icon="stat.icon"
          :status="stat.status"
        ></WidgetCounter>
        <!-- / 统计项 -->
      </a-col>
    </a-row>
    <!-- / 统计组件 -->

    <!-- 表格和时间轴 -->
    <a-row :gutter="24" type="flex" align="stretch">
      <!-- 表格 -->
      <a-col :span="24" :lg="16" class="mb-24">
        <!-- 机器人列表 -->
        <CardBotTable></CardBotTable>
        <!-- / 机器人列表 -->
      </a-col>
      <!-- / 表格 -->

      <!-- 时间轴 -->
      <a-col :span="24" :lg="8" class="mb-24">
        <!-- 事件列表 -->
        <CardEventHistory></CardEventHistory>
        <!-- / 事件列表 -->
      </a-col>
      <!-- / 时间轴 -->
    </a-row>
    <!-- / 表格和时间轴 -->
  </div>
</template>

<script>
import WidgetCounter from "../components/Widgets/WidgetCounter";
import CardBotTable from "../components/Cards/CardBotTable";
import CardEventHistory from "../components/Cards/CardEventHistory";
import { useClientStore } from "../store/client";
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";

export default {
  components: {
    WidgetCounter,
    CardBotTable,
    CardEventHistory,
  },
  setup() {
    const clientStore = useClientStore();
    onMounted(() => {
      clientStore.loadClientList();
    });
    const clientCount = computed(() => clientStore.count);

    const downstreamCount = 0;
    const upstreamCount = 0;

    const stats = computed(() => {
      return [
        {
          title: "在线客户端",
          value: clientCount.value,
          icon: "icon-park-twotone:robot",
        },
        {
          title: "下行信息数",
          value: downstreamCount,
          icon: "icon-park-twotone:download-three",
        },
        {
          title: "上行操作数",
          value: upstreamCount,
          icon: "icon-park-twotone:upload-three",
        },
        {
          title: "处理事件数",
          value: 13200,
          icon: "icon-park-twotone:align-text-both-one",
        },
      ];
    });

    return {
      stats,
    };
  },
};
</script>
