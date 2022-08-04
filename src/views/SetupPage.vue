<template>
  <div class="sign-in">
    <a-row type="flex" :gutter="[24, 24]" justify="space-around" align="middle">
      <a-col
        :span="24"
        :md="12"
        :lg="{ span: 12, offset: 0 }"
        :xl="{ span: 6, offset: 2 }"
        class="col-form"
      >
        <h1 class="mb-15">面板设置初始化</h1>
        <h5 class="font-regular text-muted">输入必要的信息以开始使用</h5>

        <a-form
          id="components-form-demo-normal-login"
          class="login-form"
          :hideRequiredMark="true"
        >
          <a-form-item
            class="mb-10"
            label="地址"
            :colon="false"
            v-bind="validateInfos.endpoint"
          >
            <a-input
              v-model:value="modelRef.endpoint"
              placeholder="面板连接地址"
            />
          </a-form-item>
          <a-form-item
            class="mb-10"
            label="令牌"
            :colon="false"
            v-bind="validateInfos.token"
          >
            <a-input
              type="password"
              v-model:value="modelRef.token"
              placeholder="请求令牌（可留空）"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              block
              html-type="submit"
              class="login-form-button"
              @click.prevent="onSubmit"
              :loading="loading"
            >
              开启面板之旅
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>

      <a-col
        :span="24"
        :md="12"
        :lg="12"
        :xl="12"
        class="col-img"
        style="overflow: visible"
      >
        <img
          src="https://s2.loli.net/2022/08/05/U6IesZbyaNi2A7P.png"
          alt=""
          style="height: 100vh"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useForm } from "ant-design-vue/lib/form";
import api from "../api";
import ls from "../utils/localStore";

export default {
  setup() {
    const loading = ref(false);

    const modelRef = reactive({
      endpoint: "",
      token: "",
    });

    const checkEndpoint = async (_rule, value) => {
      try {
        await api.get(value.replace(/\/+$/, "") + "/bots");
        return Promise.resolve();
      } catch {
        return Promise.reject("面板地址不可用");
      }
    };

    const rulesRef = reactive({
      endpoint: [
        {
          type: "url",
          required: true,
          message: "请输入正确的面板地址",
        },
        {
          validator: checkEndpoint,
          trigger: "blur",
        },
      ],
    });
    const { validate, validateInfos } = useForm(modelRef, rulesRef, {
      debounce: {
        wait: 5,
        leading: true,
      },
    });
    const onSubmit = () => {
      loading.value = true;
      validate()
        .then(() => {
          ls.set("apiUrl", modelRef.endpoint);
          ls.set("apiToken", modelRef.token);
          this.$router.push("/");
        })
        .catch(() => {})
        .finally(() => {
          loading.value = false;
        });
    };
    return {
      validateInfos,
      modelRef,
      onSubmit,
      loading,
    };
  },
};
</script>

<style scoped>
* {
  overflow: hidden;
}
</style>
