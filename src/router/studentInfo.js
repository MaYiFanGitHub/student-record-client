import StudentInfoIndex from "@v/studentInfo/Index.vue";
import StudentInfoList from "@v/studentInfo/StudentInfoList.vue";
export default {
  path: "/studentInfo",
  name: "studentInfo",
  meta: {
    name: "学生基本信息管理"
  },
  component: StudentInfoIndex,
  redirect: "/studentInfo/list",
  children: [
    {
      path: "/studentInfo/list",
      meta: {
        name: "学生基本信息列表"
      },
      component: StudentInfoList,
      children: []
    }
  ]
};
