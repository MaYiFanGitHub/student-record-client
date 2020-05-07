import ajax from "@u/ajax.js";

// 添加课程
export const addCourse = courseObj => ajax.post("/course/add", courseObj);
// 添加多个课程
export const addMoreCourse = courseList =>
  ajax.post("/course/moreAdd", courseList);
// 查询开课学年
export const queryCourseYear = () => ajax.get("/course/queryCourseYear");
// 分页获取所有课程
export const getAllCourse = (
  currentPage = 1,
  pageSize = 10,
  college_id = "",
  course_year = "",
  course_type = "",
  course_assess = "",
  course_name = "",
  user_name = ""
) =>
  ajax.get("/course/all", {
    params: {
      currentPage,
      pageSize,
      college_id,
      course_year,
      course_type,
      course_assess,
      course_name,
      user_name
    }
  });
// // 修改课程
export const editCourse = courseObj => ajax.post("/course/edit", courseObj);
// 删除班级
export const removeCourse = course_id =>
  ajax.get("/course/remove", { params: { course_id } });
// // 获取所有班级
// export const queryCourseAll = () => ajax.get("/course/queryList");
