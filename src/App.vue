<!-- 这是一切的起源，布局在此应用，路由视图在此显示 -->
<!-- 布局组件由路由列表中定义的模板动态应用 -->

<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    // 基于当前路由指定布局，默认为<layout-default></layout-default>组件。
    layout() {
      return "layout-" + (this.$route.meta.layout || "dashboard").toLowerCase();
    },
  },
};
</script>

<style lang="scss"></style>
