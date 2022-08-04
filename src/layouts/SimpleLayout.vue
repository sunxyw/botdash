<template>
  <div>
    <a-layout class="layout-default" id="layout-default" :class="[layoutClass]">
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  computed: {
    // 根据路由数据设置布局的样式类
    layoutClass() {
      return this.$route.meta.layoutClass;
    },
  },
};
</script>
