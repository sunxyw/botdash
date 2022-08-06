<template>
  <div>
    <a-form
      ref="formRef"
      :model="formState"
      layout="vertical"
      name="form_in_modal"
      style="max-width: 500px; margin: 40px auto 0"
    >
      <a-form-item
        name="id"
        label="ID"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        disabled
      >
        <a-input
          v-model:value="formState.id"
          defaultValue="（自动生成）"
          disabled
        />
      </a-form-item>
      <a-form-item
        name="platform"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="平台"
      >
        <a-select
          v-model:value="formState.platform"
          :options="allowedPlatforms"
          size="large"
        ></a-select>
      </a-form-item>
      <a-form-item
        name="impl"
        label="实现"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-group compact>
          <a-select
            v-model:value="formState.impl"
            :options="allowedImpls"
            size="large"
            style="width: 40%"
          ></a-select>
          <a-input v-model:value="formState.version" style="width: 60%" />
        </a-input-group>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 19, offset: 5 }">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <h4>转账到支付宝账户</h4>
      <p>
        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
      </p>
      <h4>转账到银行卡</h4>
      <p>
        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
      </p>
    </div>
  </div>
</template>

<script>
import { useForm } from "ant-design-vue/lib/form";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    const current = ref(0);

    const formRef = ref();
    const formState = ref({});

    const { validate } = useForm(formRef);

    const nextStep = () => {
      // 先校验，通过表单校验后，才进入下一步
      validate().then(() => {
        emit("nextStep");
      });
    };

    // TODO: 应该请求后端获得支持的平台
    const allowedPlatforms = ref([
      {
        label: "QQ",
        value: "qq",
      },
      {
        label: "Discord",
        value: "discord",
      },
      {
        label: "Telegram",
        value: "telegram",
      },
    ]);

    const allowedImpls = ref([
      {
        label: "Go CQHttp",
        value: "go-cqhttp",
      },
      {
        label: "OICQ",
        value: "oicq",
      },
    ]);

    return {
      current,
      nextStep,
      formState,
      formRef,
      allowedPlatforms,
      allowedImpls,
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
    };
  },
});
</script>

<style lang="scss" scoped>
.step-form-style-desc {
  padding: 0 56px;
  padding-bottom: 15px;
  color: rgba(0, 0, 0, 0.45);
  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    line-height: 32px;
  }
  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }
  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
