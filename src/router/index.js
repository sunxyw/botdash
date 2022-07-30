import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

let routes = [
  {
    // 匹配一切路由
    path: "*",
    component: () => import("../views/404Page.vue"),
  },
  {
    // 首页，默认跳转到 /dashboard
    path: "/",
    name: "首页",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "仪表盘",
    layout: "dashboard",
    component: () => import("../views/DashboardPage.vue"),
  },
  {
    path: "/bots",
    name: "机器人管理",
    layout: "dashboard",
    component: () => import("../views/LayoutPage.vue"),
  },
  {
    path: "/dependencies",
    name: "依赖管理",
    layout: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dependencies" */ "../views/TablesPage.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    layout: "dashboard",
    meta: {
      layoutClass: "layout-profile",
    },
    component: () => import("../views/ProfilePage.vue"),
  },
];

// 添加layout属性到每个路由的meta属性，以便可以访问
function addLayoutToRoute(route, parentLayout = "default") {
  route.meta = route.meta || {};
  route.meta.layout = route.layout || parentLayout;

  if (route.children) {
    route.children = route.children.map((childRoute) =>
      addLayoutToRoute(childRoute, route.meta.layout)
    );
  }
  return route;
}

routes = routes.map((route) => addLayoutToRoute(route));

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: "smooth",
      };
    }
    return {
      x: 0,
      y: 0,
      behavior: "smooth",
    };
  },
});

export default router;
