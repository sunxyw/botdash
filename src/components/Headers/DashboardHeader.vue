<template>
  <!-- 侧边栏 -->
  <component :is="navbarFixed ? 'a-affix' : 'div'" :offset-top="top">
    <!-- 布局头部 -->
    <a-layout-header>
      <a-row type="flex">
        <!-- 头部标题列 -->
        <a-col :span="24" :md="6">
          <!-- 面包屑导航 -->
          <a-breadcrumb>
            <a-breadcrumb-item
              ><router-link to="/"> 面板</router-link></a-breadcrumb-item
            >
            <a-breadcrumb-item>{{ this.$route.name }}</a-breadcrumb-item>
          </a-breadcrumb>
          <!-- / 面包屑导航 -->

          <!-- 头部页面标题 -->
          <div class="ant-page-header-heading">
            <span class="ant-page-header-heading-title">{{
              this.$route.name
            }}</span>
          </div>
          <!-- / 头部页面标题 -->
        </a-col>
        <!-- / 头部标题列 -->

        <!-- 头部控制列 -->
        <a-col :span="24" :md="18" class="header-control">
          <!-- 头部控制按钮 -->
          <a-dropdown
            :trigger="['click']"
            overlayClassName="header-notifications-dropdown"
            :getPopupContainer="() => wrapper"
          >
            <a-badge count="4">
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z"
                    fill="#111827"
                  />
                  <path
                    d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z"
                    fill="#111827"
                  />
                </svg>
              </a>
            </a-badge>

            <template v-slot:overlay>
              <a-list
                item-layout="horizontal"
                class="header-notifications-list"
                :data-source="notificationsData"
              >
                <template v-slot:renderItem="item">
                  <a-list-item>
                    <a-list-item-meta>
                      <template #description>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6V10C9 10.2652 9.10536 10.5196 9.29289 10.7071L12.1213 13.5355C12.5118 13.9261 13.145 13.9261 13.5355 13.5355C13.9261 13.145 13.9261 12.5118 13.5355 12.1213L11 9.58579V6Z"
                            fill="#111827"
                          />
                        </svg>
                        <span>{{ item.time }}</span>
                      </template>
                      <template v-slot:title>
                        <a href="#">{{ item.title }}</a>
                      </template>
                      <template v-slot:avatar v-if="item.img">
                        <a-avatar shape="square" :src="item.img" />
                      </template>
                      <template v-slot:avatar v-else>
                        <a-avatar shape="square" v-html="item.svg" />
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
            </template>
          </a-dropdown>
          <a-button
            type="link"
            ref="secondarySidebarTriggerBtn"
            @click="$emit('toggleSettingsDrawer', true)"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
                fill="#111827"
              />
            </svg>
          </a-button>
          <a-button
            type="link"
            class="sidebar-toggler"
            @click="
              $emit('toggleSidebar', !sidebarCollapsed), resizeEventHandler()
            "
          >
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              />
            </svg>
          </a-button>
          <!-- / 头部控制按钮 -->
        </a-col>
        <!-- / 头部控制列 -->
      </a-row>
    </a-layout-header>
    <!--  / 布局头部 -->
  </component>
  <!-- / 侧边栏 -->
</template>

<script>
const notificationsData = [];

export default {
  props: {
    // 头部固定状态
    navbarFixed: {
      type: Boolean,
      default: false,
    },

    // 侧边栏折叠状态
    sidebarCollapsed: {
      type: Boolean,
      default: false,
    },

    // 头部通知数据
    notificationsData: {
      type: Array,
      default: () => notificationsData,
    },
  },
  data() {
    return {
      // 固定头部/侧边栏尾部（附加组件）顶部偏移
      top: 0,

      // 搜索输入加载状态
      searchLoading: false,

      // 要将下拉列表附加到的包装器元素
      wrapper: document.body,
    };
  },
  methods: {
    resizeEventHandler() {
      this.top = this.top ? 0 : -0.01;
      // 用于在窗口大小改变时刷新头部
      // 负值是因为它不会激活 affix，除非滚动条位于顶部之外。
    },
  },
  mounted() {
    // 将下拉框包装元素设置为正确的元素
    this.wrapper = document.getElementById("layout-dashboard");
  },
  created() {
    // 注册窗口大小改变事件，以解决affix元素大小改变时出现的错误。
    window.addEventListener("resize", this.resizeEventHandler);
  },
  unmounted() {
    // 移除窗口大小改变事件监听器
    window.removeEventListener("resize", this.resizeEventHandler);
  },
  emits: ["toggleSettingsDrawer", "toggleSidebar"],
};
</script>
