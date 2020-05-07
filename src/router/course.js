import CourseIndex from "@v/course/Index.vue";
import CourseList from "@v/course/CourseList.vue";
import AddCourse from "@v/course/AddCourse.vue";
import CourseForm from "@v/course/CourseForm.vue";

export default {
  path: "/course",
  name: "course",
  meta: {
    name: "课程管理"
  },
  component: CourseIndex,
  redirect: "/course/list",
  children: [
    {
      path: "/course/list",
      meta: {
        name: "课程列表"
      },
      component: CourseList,
      children: []
    },
    {
      path: "/course/add",
      name: "courseAdd",
      meta: {
        name: "课程添加"
      },
      component: AddCourse
    },
    {
      path: "/course/edit",
      name: "courseEdit",
      meta: {
        name: "课程编辑"
      },
      component: CourseForm
    }
  ]
};
