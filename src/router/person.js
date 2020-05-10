import PersonIndex from "@v/person/Index.vue";
import Person from "@v/person/Person.vue";
import PersonPassword from "@v/person/PersonPassword.vue";

export default {
  path: "/person",
  name: "person",
  meta: {
    name: "个人资料管理"
  },
  component: PersonIndex,
  redirect: "/person/add",
  children: [
    {
      path: "/person/add",
      meta: {
        name: "个人资料录入"
      },
      component: Person,
      children: []
    },
    {
      path: "/person/password",
      meta: {
        name: "密码修改"
      },
      component: PersonPassword
    }
  ]
};
