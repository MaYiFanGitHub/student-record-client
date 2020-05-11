import RollIndex from "@v/roll/Index.vue";
import RollList from "@v/roll/RollList.vue";
import AddRoll from "@v/roll/AddRoll.vue";
import RollPerson from "@v/roll/RollPerson.vue";

export default {
  path: "/roll",
  name: "roll",
  meta: {
    name: "学籍管理"
  },
  component: RollIndex,
  redirect: "/roll/list",
  children: [
    {
      path: "/roll/list",
      meta: {
        name: "学籍异动查询"
      },
      component: RollList,
      children: []
    },
    {
      path: "/roll/add",
      name: "rollAdd",
      meta: {
        name: "学籍异动申请"
      },
      component: AddRoll
    },
    {
      path: "/roll/person",
      name: "rollPerson",
      meta: {
        name: "个人学籍异动查询"
      },
      component: RollPerson
    }
  ]
};
