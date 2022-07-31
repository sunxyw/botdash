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
        <CardBotTable :data="tableData" :columns="tableColumns"></CardBotTable>
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

// 统计信息
const stats = [
  {
    title: "在线客户端",
    value: 2,
    icon: `
            <svg width="22" height="22" fill="none" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M160 352h192V160H160V352zM448 176h48C504.8 176 512 168.8 512 160s-7.162-16-16-16H448V128c0-35.35-28.65-64-64-64h-16V16C368 7.164 360.8 0 352 0c-8.836 0-16 7.164-16 16V64h-64V16C272 7.164 264.8 0 256 0C247.2 0 240 7.164 240 16V64h-64V16C176 7.164 168.8 0 160 0C151.2 0 144 7.164 144 16V64H128C92.65 64 64 92.65 64 128v16H16C7.164 144 0 151.2 0 160s7.164 16 16 16H64v64H16C7.164 240 0 247.2 0 256s7.164 16 16 16H64v64H16C7.164 336 0 343.2 0 352s7.164 16 16 16H64V384c0 35.35 28.65 64 64 64h16v48C144 504.8 151.2 512 160 512c8.838 0 16-7.164 16-16V448h64v48c0 8.836 7.164 16 16 16c8.838 0 16-7.164 16-16V448h64v48c0 8.836 7.164 16 16 16c8.838 0 16-7.164 16-16V448H384c35.35 0 64-28.65 64-64v-16h48c8.838 0 16-7.164 16-16s-7.162-16-16-16H448v-64h48C504.8 272 512 264.8 512 256s-7.162-16-16-16H448V176zM384 368c0 8.836-7.162 16-16 16h-224C135.2 384 128 376.8 128 368v-224C128 135.2 135.2 128 144 128h224C376.8 128 384 135.2 384 144V368z"/>
            </svg>`,
  },
  {
    title: "下行信息数",
    value: 3200,
    icon: `
						<svg width="22" height="22" fill="none" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 417.1c-16.38 0-32.88-4.1-46.88-15.12L0 250.9v213.1C0 490.5 21.5 512 48 512h416c26.5 0 48-21.5 48-47.1V250.9l-209.1 151.1C288.9 412 272.4 417.1 256 417.1zM493.6 163C484.8 156 476.4 149.5 464 140.1v-44.12c0-26.5-21.5-48-48-48l-77.5 .0016c-3.125-2.25-5.875-4.25-9.125-6.5C312.6 29.13 279.3-.3732 256 .0018C232.8-.3732 199.4 29.13 182.6 41.5c-3.25 2.25-6 4.25-9.125 6.5L96 48c-26.5 0-48 21.5-48 48v44.12C35.63 149.5 27.25 156 18.38 163C6.75 172 0 186 0 200.8v10.62l96 69.37V96h320v184.7l96-69.37V200.8C512 186 505.3 172 493.6 163zM176 255.1h160c8.836 0 16-7.164 16-15.1c0-8.838-7.164-16-16-16h-160c-8.836 0-16 7.162-16 16C160 248.8 167.2 255.1 176 255.1zM176 191.1h160c8.836 0 16-7.164 16-16c0-8.838-7.164-15.1-16-15.1h-160c-8.836 0-16 7.162-16 15.1C160 184.8 167.2 191.1 176 191.1z"/>
            </svg>`,
  },
  {
    title: "上行操作数",
    value: 1200,
    icon: `
						<svg width="22" height="22" fill="none" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.372 86.63C-3.124 74.13-3.124 53.87 9.372 41.37C21.87 28.88 42.13 28.88 54.63 41.37L246.6 233.4C259.1 245.9 259.1 266.1 246.6 278.6L54.63 470.6C42.13 483.1 21.87 483.1 9.372 470.6C-3.124 458.1-3.124 437.9 9.372 425.4L178.7 256L9.372 86.63zM544 416C561.7 416 576 430.3 576 448C576 465.7 561.7 480 544 480H256C238.3 480 224 465.7 224 448C224 430.3 238.3 416 256 416H544z"/>
            </svg>`,
  },
  {
    title: "处理事件数",
    value: 13200,
    icon: `
						<svg width="22" height="22" fill="none" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M399.36,362.23c29.49-34.69,47.1-78.34,47.1-125.79C446.46,123.49,346.86,32,224,32S1.54,123.49,1.54,236.44,101.14,440.87,224,440.87a239.28,239.28,0,0,0,79.44-13.44,7.18,7.18,0,0,1,8.12,2.56c18.58,25.09,47.61,42.74,79.89,49.92a4.42,4.42,0,0,0,5.22-3.43,4.37,4.37,0,0,0-.85-3.62,87,87,0,0,1,3.69-110.69ZM329.52,212.4l-57.3,43.49L293,324.75a6.5,6.5,0,0,1-9.94,7.22L224,290.92,164.94,332a6.51,6.51,0,0,1-9.95-7.22l20.79-68.86-57.3-43.49a6.5,6.5,0,0,1,3.8-11.68l71.88-1.51,23.66-67.92a6.5,6.5,0,0,1,12.28,0l23.66,67.92,71.88,1.51a6.5,6.5,0,0,1,3.88,11.68Z"/>
            </svg>`,
  },
];

// 机器人列表表格列的属性
const tableColumns = [
  {
    title: "机器人",
    dataIndex: "bot",
    scopedSlots: { customRender: "bot" },
    width: 300,
  },
  {
    title: "客户端",
    dataIndex: "client",
    scopedSlots: { customRender: "client" },
  },
  {
    title: "处理事件数",
    dataIndex: "events",
    class: "font-bold text-muted text-sm",
  },
  {
    title: "负载",
    scopedSlots: { customRender: "completion" },
    dataIndex: "completion",
  },
];

// 机器人列表数据
const tableData = [
  {
    key: "1",
    bot: {
      name: "温暖之风",
      type: "tencentqq",
    },
    client: "go-cqhttp",
    events: "14,000",
    completion: 60,
  },
  {
    key: "2",
    bot: {
      name: "不寒之冬",
      type: "telegram",
    },
    client: "go-cqhttp",
    events: "13,000",
    completion: 30,
  },
  {
    key: "3",
    bot: {
      name: "明媚之夜",
      type: "discord",
    },
    client: "go-cqhttp",
    events: "12,000",
    completion: 10,
  },
];

export default {
  components: {
    WidgetCounter,
    CardBotTable,
    CardEventHistory,
  },
  data() {
    return {
      // Associating table data with its corresponding property.
      tableData,

      // Associating table columns with its corresponding property.
      tableColumns,

      // Counter Widgets Stats
      stats,
    };
  },
};
</script>
