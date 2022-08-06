<template>
  <div>
    <a-modal
      v-bind="$props"
      title="Create a new collection"
      ok-text="Create"
      cancel-text="Cancel"
      @ok="onOkInternal"
      @cancel="onCancel"
      destroyOnClose
    >
      <a-steps :current="current" size="small" progress-dot class="mb-20">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <a-form
        ref="formRef"
        :model="formState"
        layout="vertical"
        name="form_in_modal"
      >
        <a-form-item name="id" label="ID" disabled>
          <a-input
            v-model:value="formState.id"
            defaultValue="（自动生成）"
            disabled
          />
        </a-form-item>
        <a-form-item name="platform" label="平台">
          <a-select
            v-model:value="formState.platform"
            :options="allowedPlatforms"
            size="large"
          ></a-select>
        </a-form-item>
        <a-form-item name="impl" label="实现">
          <a-input-group compact>
            <a-input v-model:value="formState.impl" style="width: 50%" />
            <a-input v-model:value="formState.version" style="width: 50%" />
          </a-input-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { Modal } from "ant-design-vue";
import { computed, defineComponent, ref, toRaw } from "vue";

export default defineComponent({
  props: {
    ...Modal.props,
    bot: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const current = ref(0);
    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };

    const steps = [
      {
        title: "First",
        content: "First-content",
      },
      {
        title: "Second",
        content: "Second-content",
      },
      {
        title: "Last",
        content: "Last-content",
      },
    ];

    const formRef = ref();
    const formState = computed(() => props.bot);

    const onOkInternal = () => {
      if (current.value === steps.length - 1) {
        emit("submit", toRaw(formState));
        return Promise.resolve();
      } else {
        next();
        return Promise.reject();
      }
      // formRef.value
      //   .validateFields()
      //   .then((values) => {
      //     console.log("Received values of form: ", values);
      //     console.log("formState: ", toRaw(formState));
      //     formRef.value.resetFields();
      //     console.log("reset formState: ", toRaw(formState));
      //   })
      //   .catch((info) => {
      //     console.log("Validate Failed:", info);
      //   });
    };

    const creating = computed(() => {
      return !props.bot.id;
    });

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

    return {
      current,
      next,
      prev,
      steps,
      formState,
      formRef,
      onOkInternal,
      creating,
      allowedPlatforms,
    };
  },
});
</script>
<style>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
