import ajax from "@u/ajax.js";

// 获取所有本学院的学生
export const queryStudentByCollege = () => ajax.get("/student/queryByCollege");
// 添加成绩
export const addStudentScore = scoreList =>
  ajax.post("/student/add", scoreList);
// 更新成绩
export const updateStudentScore = score =>
  ajax.post("/student/updateScore", score);
// 成绩异议更新
export const updateApplyScore = score =>
  ajax.post("/student/applyScore", score);
// 删除成绩
export const deleteStudentScore = (student_id, course_id) =>
  ajax.get("/student/deleteScore", { params: { student_id, course_id } });
// 分页获取所有成绩
export const getAllStudent = (
  currentPage = 1,
  pageSize = 10,
  class_id = "",
  specialty = ""
) =>
  ajax.get("/student/all", {
    params: { currentPage, pageSize, class_id, specialty }
  });
// 成绩异议列表
export const getApplyScoreList = (
  currentPage = 1,
  pageSize = 10,
  class_id = "",
  specialty = "",
  apply_type = -1
) =>
  ajax.get("/student/queryApplyList", {
    params: { currentPage, pageSize, class_id, specialty, apply_type }
  });
// 获取学生个人成绩
export const queryStudentPersonScore = (
  course_year = "all",
  course_type = "all",
  student_id
) =>
  ajax.get("/student/queryPersonScore", {
    params: { course_year, course_type, student_id }
  });
// 获取学生个人信息
export const queryStudentInfo = student_id =>
  ajax.get("/student/queryStudentInfo", {
    params: { student_id }
  });
// // 修改班级
// export const editClass = classObj => ajax.post("/class/edit", classObj);
// // 删除班级
// export const removeClass = class_id =>
//   ajax.get("/class/remove", { params: { class_id } });
// // 获取所有班级
// export const queryClassAll = () => ajax.get("/class/queryList");
