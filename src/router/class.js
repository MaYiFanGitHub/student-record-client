import ClassIndex from "@v/class/Index.vue";
import ClassList from "@v/class/ClassList.vue";
import AddClass from "@v/class/AddClass.vue";

export default {
  path: "/class",
  name: "class",
  meta: {
    name: "班级管理"
  },
  component: ClassIndex,
  redirect: "/class/list",
  children: [
    {
      path: "/class/list",
      meta: {
        name: "班级列表"
      },
      component: ClassList,
      children: []
    },
    {
      path: "/class/add",
      name: "classAdd",
      meta: {
        name: "班级添加"
      },
      component: AddClass
    },
    {
      path: "/class/edit",
      name: "classEdit",
      meta: {
        name: "班级编辑"
      },
      component: AddClass
    }
  ]
};
