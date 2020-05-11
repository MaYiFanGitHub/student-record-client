import HonorIndex from "@v/honor/Index.vue";
import HonorList from "@v/honor/HonorList.vue";
import AddHonor from "@v/honor/AddHonor.vue";
import HonorQuery from "@v/honor/PersonHonor.vue";

export default {
  path: "/honor",
  name: "honor",
  meta: {
    name: "奖惩信息管理"
  },
  component: HonorIndex,
  redirect: "/honor/list",
  children: [
    {
      path: "/honor/list",
      meta: {
        name: "奖惩信息列表"
      },
      component: HonorList,
      children: []
    },
    {
      path: "/honor/add",
      name: "honorAdd",
      meta: {
        name: "奖惩信息添加"
      },
      component: AddHonor
    },
    {
      path: "/honor/edit",
      name: "honorEdit",
      meta: {
        name: "奖惩信息编辑"
      },
      component: AddHonor
    },
    {
      path: "/honor/query",
      name: "honorQuery",
      meta: {
        name: "奖惩信息查询"
      },
      component: HonorQuery
    }
  ]
};
