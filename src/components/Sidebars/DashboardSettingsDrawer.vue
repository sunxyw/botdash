<template>
  <!-- 设定菜单 -->
  <a-drawer
    class="settings-drawer"
    :class="[rtl ? 'settings-drawer-rtl' : '']"
    :placement="rtl ? 'left' : 'right'"
    :closable="false"
    :visible="showSettingsDrawer"
    width="360"
    :getContainer="() => wrapper"
    @close="$emit('toggleSettingsDrawer', false)"
  >
    <!-- 设定菜单关闭按钮 -->
    <a-button
      type="link"
      class="btn-close"
      @click="$emit('toggleSettingsDrawer', false)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="9"
        viewBox="0 0 9 9"
      >
        <g id="close" transform="translate(0.75 0.75)">
          <path
            id="Path"
            d="M7.5,0,0,7.5"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
          />
          <path
            id="Path-2"
            data-name="Path"
            d="M0,0,7.5,7.5"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
          />
        </g>
      </svg>
    </a-button>
    <!-- / 设定菜单关闭按钮 -->

    <!-- 设定菜单内容 -->
    <div class="drawer-content">
      <h6>设定</h6>
      <p>面板选项</p>
      <hr />
      <div class="sidebar-color">
        <h6>侧边栏颜色</h6>
        <a-radio-group
          v-model="sidebarColorModel"
          @change="$emit('updateSidebarColor', $event.target.value)"
          defaultValue="primary"
        >
          <a-radio-button value="primary" class="bg-primary"></a-radio-button>
          <a-radio-button
            value="secondary"
            class="bg-secondary"
          ></a-radio-button>
          <a-radio-button value="success" class="bg-success"></a-radio-button>
          <a-radio-button value="danger" class="bg-danger"></a-radio-button>
          <a-radio-button value="warning" class="bg-warning"></a-radio-button>
          <a-radio-button value="black" class="bg-dark"></a-radio-button>
        </a-radio-group>
      </div>
      <div class="sidenav-type">
        <h6>侧边栏类型</h6>
        <a-radio-group
          button-style="solid"
          v-model:checked="sidebarThemeModel"
          @change="$emit('updateSidebarTheme', $event.target.value)"
          defaultValue="primary"
        >
          <a-radio-button value="light">透明</a-radio-button>
          <a-radio-button value="white">白色</a-radio-button>
        </a-radio-group>
      </div>
      <div class="navbar-fixed">
        <h6>固定导航栏</h6>
        <a-switch
          default-checked
          v-model:checked="navbarFixedModel"
          @change="$emit('toggleNavbarPosition', navbarFixedModel)"
        />
      </div>
      <div class="download">
        <a-button
          type="dark"
          href="https://www.creative-tim.com/product/muse-vue-ant-design-dashboard"
          block
          target="_blank"
          >项目地址</a-button
        >
        <a-button
          type="primary"
          href="https://www.creative-tim.com/product/muse-vue-ant-design-dashboard-pro"
          block
          target="_blank"
          >提交功能请求</a-button
        >
        <a-button
          type="secondary"
          href="https://demos.creative-tim.com/muse-vue-ant-design-dashboard/documentation"
          block
          target="_blank"
          >查阅开发文档</a-button
        >
      </div>
    </div>
    <!-- / 设定面板内容 -->
  </a-drawer>
  <!-- / 设定面板 -->
</template>

<script>
export default {
  props: {
    // 设定菜单显示状态
    showSettingsDrawer: {
      type: Boolean,
      default: false,
    },

    // 侧边栏颜色
    sidebarColor: {
      type: String,
      default: "primary",
    },

    // 侧边栏主题：light, white, dark.
    sidebarTheme: {
      type: String,
      default: "light",
    },

    // 头部固定状态
    navbarFixed: {
      type: Boolean,
      default: false,
    },

    // 设定菜单方向
    rtl: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 下拉框包装元素
      wrapper: document.body,

      // 侧边栏颜色
      sidebarColorModel: this.sidebarColor,

      // 侧边栏主题：light, white, dark.
      sidebarThemeModel: this.sidebarTheme,

      // 头部固定状态
      navbarFixedModel: this.navbarFixed,
    };
  },
  mounted() {
    // 将下拉框包装元素设置为正确的元素
    this.wrapper = document.getElementById("layout-dashboard");
  },
  emits: [
    "toggleSettingsDrawer",
    "updateSidebarColor",
    "updateSidebarTheme",
    "toggleNavbarPosition",
  ],
};
</script>
