import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@v/Home.vue";
import Login from "@v/Login/Login.vue";
import Welcome from "@v/welcome/Welcome.vue";

// 用户模块
import UserIndex from "@v/user/Index.vue";
import UserList from "@v/user/UserList.vue";
import AddUser from "@v/user/AddUser.vue";
import EditUser from "@v/user/UserForm.vue";

// 解决同一路由下跳转报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err);
};
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
        children: []
      },
      {
        path: "/user",
        name: "user",
        meta: {
          name: "用户管理"
        },
        component: UserIndex,
        redirect: "/user/userList",
        children: [
          {
            path: "/user/userList",
            meta: {
              name: "用户列表"
            },
            component: UserList,
            children: []
          },
          {
            path: "/user/userAdd",
            meta: {
              name: "用户添加"
            },
            component: AddUser
          },
          {
            path: "/user/editAdd",
            name: "userEditAdd",
            meta: {
              name: "编辑用户"
            },
            component: EditUser
          }
        ]
      },

      {
        name: "404",
        path: "/404",
        component: () => import("@c/notFound/NotFound.vue")
      }
    ]
  },

  {
    path: "/login",
    name: "login",
    component: Login
  },

  {
    path: "*", // 此处需特别注意至于最底部
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
