<template>
  <!-- 机器人列表表格 -->
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="12">
          <h6>机器人列表</h6>
          <p>数据可能存在延迟</p>
        </a-col>
      </a-row>
    </template>

    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :loading="loading"
    >
      <template #bodyCell="{ column, record }">
        <!-- 第一栏，展示平台图标和机器人名称 -->
        <template v-if="column.key === 'bot'">
          <a @click="openDetailModal(record)">
            <img
              :src="
                `https://unpkg.com/simple-icons@v7/icons/` +
                getUnifiedBotType(record.platform) +
                `.svg`
              "
              width="25"
              class="mr-10"
            />
            {{ record.name }}
          </a>
        </template>

        <!-- 第二栏，展示实现图标和名称和版本 -->
        <template v-else-if="column.key === 'impl'">
          <a-avatar size="small" :src="getClientLogo(record.impl)" />
          <a-tag>{{ record.impl }}</a-tag>
          <a-tag>{{ record.version }}</a-tag>
        </template>

        <!-- 第三栏，展示标准名称和版本 -->
        <template v-else-if="column.key === 'standard'">
          <a-tag>{{ record.standard.name }}</a-tag>
          <a-tag>{{ record.standard.version }}</a-tag>
        </template>

        <!-- 第四栏，展示状态 -->
        <template v-else-if="column.key === 'status'">
          <a-badge status="success" text="运作良好" v-if="record.status.good" />
          <a-badge
            status="warning"
            text="部分可用"
            v-else-if="record.status.online"
          />
          <a-badge status="error" text="不可用" v-else />
        </template>
      </template>
    </a-table>

    <div class="table-upload-btn">
      <a-button type="dashed" block @click="modalOpen = true">
        添加机器人
      </a-button>
    </div>
  </a-card>
  <!-- / 机器人列表表格 -->

  <ModalBotForm
    v-model:visible="modalOpen"
    :bot="modalBot"
    @submit="handleModalSubmit"
    @cancel="handleModalCancel"
  ></ModalBotForm>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useBotStore } from "@/store/bot";
import ModalBotForm from "../Modals/ModalBotForm";

export default {
  components: {
    ModalBotForm,
  },
  setup() {
    const columns = [
      {
        key: "bot",
        title: "机器人",
        dataIndex: "name",
        scopedSlots: { customRender: "bot" },
        width: 300,
      },
      {
        key: "impl",
        title: "实现",
        dataIndex: "impl",
        scopedSlots: { customRender: "impl" },
      },
      {
        key: "standard",
        title: "协议（标准）",
        dataIndex: "standard",
        scopedSlots: { customRender: "standard" },
      },
      {
        key: "status",
        title: "状态",
        dataIndex: "status",
        scopedSlots: { customRender: "status" },
      },
    ];

    const loading = ref(true);

    const botStore = useBotStore();
    onMounted(() => {
      botStore.loadBotList();
      loading.value = false;
    });
    const data = computed(() => botStore.list);

    const interval = setInterval(() => {
      loading.value = true;
      botStore.loadBotList();
      loading.value = false;
    }, 5000);
    onUnmounted(() => {
      clearInterval(interval);
    });

    const getClientLogo = (client) => {
      switch (client) {
        case "go-cqhttp":
          return "https://user-images.githubusercontent.com/25968335/120111974-8abef880-c139-11eb-99cd-fa928348b198.png";
        case "oicq":
          return "https://avatars.githubusercontent.com/u/12014361";
        default:
          return "https://user-images.githubusercontent.com/25968335/120111974-8abef880-c139-11eb-99cd-fa928348b198.png";
      }
    };

    const getUnifiedBotType = (type) => {
      switch (type) {
        case "qq":
          return "tencentqq";
        default:
          return type;
      }
    };

    const modalOpen = ref(false);
    const modalBot = ref({});

    const handleModalSubmit = () => {
      modalBot.value = {};
    };
    const handleModalCancel = () => {
      modalBot.value = {};
    };
    const openDetailModal = (record) => {
      modalBot.value = record;
      modalOpen.value = true;
    };

    return {
      columns,
      data,
      getClientLogo,
      getUnifiedBotType,
      loading,
      modalOpen,
      handleModalSubmit,
      handleModalCancel,
      modalBot,
      openDetailModal,
    };
  },
};
</script>
