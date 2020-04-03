import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@v/Home.vue";
import Login from "@v/Login/Login.vue";
import Welcome from "@v/welcome/Welcome.vue";
import Test from "@v/test/test.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        name: "welcome",
        meta: {
          name: "首页"
        },
        component: Welcome,
        children: [
          {
            path: "/welcome/test",
            component: Test,
            meta: {
              name: "测试"
            }
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
