<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    // 基于当前路由指定布局，默认为<layout-default></layout-default>组件。
    layout() {
      return `layout-${(this.$route.meta.layout || "dashboard").toLowerCase()}`;
    },
  },
};
</script>
