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
      <a-steps :current="current" size="small" progress-dot>
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <a-form
        ref="formRef"
        :model="formState"
        layout="vertical"
        name="form_in_modal"
      >
        <a-form-item name="id" label="ID" disabled>
          <a-input v-model:value="formState.id" />
        </a-form-item>
        <a-form-item name="type" label="type">
          <a-input v-model:value="formState.type" />
        </a-form-item>
        <a-form-item name="name" label="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { Modal } from "ant-design-vue";
import { computed, defineComponent, reactive, ref, toRaw } from "vue";

export default defineComponent({
  props: {
    ...Modal.props,
    bot: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
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
    const formState = reactive(props.bot);

    const onOkInternal = () => {
      if (current.value === steps.length - 1) {
        props.onOk(toRaw(formState));
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

    return {
      current,
      next,
      prev,
      steps,
      formState,
      formRef,
      onOkInternal,
      creating,
    };
  },
});
</script>
<style>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
