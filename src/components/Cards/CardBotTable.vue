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
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <a-space
        slot="client"
        slot-scope="client"
        :size="-12"
        class="avatar-chips"
      >
        <a-avatar size="small" :src="getClientLogo(client)" />
      </a-space>

      <template slot="bot" slot-scope="bot">
        <h6 class="m-0">
          <img
            :src="`https://unpkg.com/simple-icons@v7/icons/${bot.type}.svg`"
            width="25"
            class="mr-10"
          />
          {{ bot.name }}
        </h6>
      </template>

      <template slot="completion" slot-scope="completion">
        <span class="font-bold text-muted text-sm">{{
          completion.label ? completion.label : completion
        }}</span>
        <a-progress
          :percent="completion.value ? completion.value : completion"
          :show-info="false"
          size="small"
          :status="completion.status ? completion.status : 'normal'"
        />
      </template>
    </a-table>

    <div class="table-upload-btn">
      <a-button type="dashed" block>
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z"
            fill="#111827"
          />
        </svg>
        添加机器人
      </a-button>
    </div>
  </a-card>
  <!-- / 机器人列表表格 -->
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // 头部按钮选项
      projectHeaderBtns: "all",
    };
  },
  methods: {
    getClientLogo(client) {
      switch (client) {
        case "go-cqhttp":
          return "https://user-images.githubusercontent.com/25968335/120111974-8abef880-c139-11eb-99cd-fa928348b198.png";
        case "oicq":
          return "https://avatars.githubusercontent.com/u/12014361";
        default:
          return "https://user-images.githubusercontent.com/25968335/120111974-8abef880-c139-11eb-99cd-fa928348b198.png";
      }
    },
  },
};
</script>
