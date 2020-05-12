import JobIndex from "@v/job/Index.vue";
import JobList from "@v/job/JobList.vue";
import AddJob from "@v/job/AddJob.vue";
// import JobQuery from "@v/job/PersonJob.vue";

export default {
  path: "/job",
  name: "job",
  meta: {
    name: "就业信息管理"
  },
  component: JobIndex,
  redirect: "/job/list",
  children: [
    {
      path: "/job/list",
      meta: {
        name: "就业信息列表"
      },
      component: JobList,
      children: []
    },
    {
      path: "/job/add",
      name: "jobAdd",
      meta: {
        name: "就业信息添加"
      },
      component: AddJob
    },
    {
      path: "/job/edit",
      name: "jobEdit",
      meta: {
        name: "就业信息编辑"
      },
      component: AddJob
    }
    // {
    //   path: "/job/query",
    //   name: "jobQuery",
    //   meta: {
    //     name: "就业信息查询"
    //   },
    //   component: JobQuery
    // }
  ]
};
