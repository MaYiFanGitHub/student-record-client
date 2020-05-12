import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@v/Home.vue";
import Login from "@v/Login/Login.vue";
import Welcome from "@v/welcome/Welcome.vue";

// 角色
import Role from "@v/role/Role.vue";

// 用户模块
import UserIndex from "@v/user/Index.vue";
import UserList from "@v/user/UserList.vue";
import AddUser from "@v/user/AddUser.vue";
import UserForm from "@v/user/UserForm.vue";

// 学院模块
import CollegeIndex from "@v/college/Index.vue";
import CollegeList from "@v/college/CollegeList.vue";
import AddCollege from "@v/college/AddCollege.vue";

// 专业模块
import MajorIndex from "@v/major/Index.vue";
import MajorList from "@v/major/MajorList.vue";
import AddMajor from "@v/major/AddMajor.vue";

// 班级模块
import classRouter from "./class";
// 课程模块
import courseRouter from "./course.js";
// 成绩模块
import scoreRouter from "./score";
// 个人资料模块
import PersonRouter from "./person";
// 学籍模块
import RollRouter from "./roll";
// 学生基本信息管理模块
import StudentRouter from "./studentInfo";
// 奖惩信息模块
import HonorRouter from "./honor";
// 就业信息模块
import JobRouter from "./job";

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
        path: "/role",
        name: "role",
        meta: {
          name: "角色管理"
        },
        component: Role,
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
            path: "/user/userEdit",
            name: "userEdit",
            meta: {
              name: "用户编辑"
            },
            component: UserForm
          }
        ]
      },
      {
        path: "/college",
        name: "college",
        meta: {
          name: "学院管理"
        },
        component: CollegeIndex,
        redirect: "/college/list",
        children: [
          {
            path: "/college/list",
            meta: {
              name: "学院列表"
            },
            component: CollegeList,
            children: []
          },
          {
            path: "/college/add",
            name: "collegeAdd",
            meta: {
              name: "学院添加"
            },
            component: AddCollege
          },
          {
            path: "/college/edit",
            name: "collegeEdit",
            meta: {
              name: "学院编辑"
            },
            component: AddCollege
          }
        ]
      },
      {
        path: "/major",
        name: "major",
        meta: {
          name: "专业管理"
        },
        component: MajorIndex,
        redirect: "/major/list",
        children: [
          {
            path: "/major/list",
            meta: {
              name: "专业列表"
            },
            component: MajorList,
            children: []
          },
          {
            path: "/major/add",
            name: "majorAdd",
            meta: {
              name: "专业添加"
            },
            component: AddMajor
          },
          {
            path: "/major/edit",
            name: "majorEdit",
            meta: {
              name: "专业编辑"
            },
            component: AddMajor
          }
        ]
      },
      classRouter,
      courseRouter,
      scoreRouter,
      PersonRouter,
      RollRouter,
      StudentRouter,
      HonorRouter,
      JobRouter,
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
