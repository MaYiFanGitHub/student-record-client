import ScoreIndex from "@v/score/Index.vue";
import ScoreList from "@v/score/ScoreList.vue";
import AddScore from "@v/score/AddScore.vue";
import ScoreForm from "@v/score/ScoreForm.vue";
import ScoreStudentList from "@v/score/ScoreStudentList.vue";

export default {
  path: "/score",
  name: "score",
  meta: {
    name: "成绩管理"
  },
  component: ScoreIndex,
  redirect: "/score/list",
  children: [
    {
      path: "/score/list",
      meta: {
        name: "成绩列表"
      },
      component: ScoreList,
      children: []
    },
    {
      path: "/score/add",
      name: "scoreAdd",
      meta: {
        name: "成绩添加"
      },
      component: AddScore
    },
    {
      path: "/score/edit",
      name: "scoreEdit",
      meta: {
        name: "成绩编辑"
      },
      component: ScoreForm
    },
    {
      path: "/score/studentList",
      name: "scoreStudentList",
      meta: {
        name: "个人成绩"
      },
      component: ScoreStudentList
    }
  ]
};
