import * as VueRouter from "vue-router";
import ls from "../utils/localStore";

let routes = [
  {
    // 匹配一切路由
    path: "/:pathMatch(.*)*",
    component: () => import("../views/404Page.vue"),
  },
  {
    // 首页，默认跳转到 /dashboard
    path: "/",
    name: "首页",
    get redirect() {
      if (ls.get("apiUrl").length > 0) {
        return "/dashboard";
      } else {
        return "/setup";
      }
    },
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
    children: [
      {
        path: "list",
        name: "机器人列表",
        component: () => import("../views/bot/ListPage.vue"),
      },
      {
        path: "new",
        name: "新建机器人",
        component: () => import("../views/bot/NewPage.vue"),
      },
    ],
  },
  {
    path: "/dependencies",
    name: "依赖管理",
    layout: "dashboard",
    component: () => import("../views/DashboardPage.vue"),
  },
  {
    path: "/setup",
    name: "初始化",
    component: () => import("../views/SetupPage.vue"),
    layout: "simple",
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

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: "smooth",
      };
    }
    return { left: 0, top: 0, behavior: "smooth" };
  },
});

export default router;
