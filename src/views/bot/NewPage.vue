<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-card
        :bordered="false"
        class="header-solid h-full"
        :bodyStyle="{ padding: 0 }"
      >
        <template #title>
          <a-row type="flex" align="middle">
            <a-col :span="24" :md="12">
              <h6>新建机器人</h6>
              <p>部分框架可能并未实现/不支持此功能</p>
            </a-col>
          </a-row>
        </template>

        <a-steps class="steps" :current="currentTab">
          <a-step
            :title="step.title"
            v-for="(step, index) in steps"
            :key="index"
          />
        </a-steps>
        <div class="content">
          <step1 v-if="currentTab === 0" @nextStep="nextStep"></step1>
          <div v-if="currentTab === 1">222</div>
          <div v-if="currentTab === 2">333</div>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { ref } from "vue";
import Step1 from "./NewFormStep1";

export default {
  components: {
    Step1,
  },
  setup() {
    const steps = [
      { title: "选择平台" },
      { title: "选择实现" },
      { title: "选择标准" },
    ];

    const currentTab = ref(0);

    const nextStep = () => {
      if (currentTab.value < 2) {
        currentTab.value += 1;
      }
    };
    const prevStep = () => {
      if (currentTab.value > 0) {
        currentTab.value -= 1;
      }
    };
    const finish = () => {
      currentTab.value = 0;
    };

    return {
      steps,
      currentTab,
      nextStep,
      prevStep,
      finish,
    };
  },
};
</script>

<style scoped>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
</style>
