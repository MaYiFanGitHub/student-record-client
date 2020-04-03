import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/home/Home.vue";
import Login from "../views/Login/Login.vue";
import Welcome from "../views/welcome/Welcome.vue";
import Test from "../views/test/test.vue";

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
        component: Welcome
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/test",
    component: Test
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
