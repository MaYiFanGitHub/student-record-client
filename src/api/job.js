import ajax from "@u/ajax.js";

// 添加就业信息
export const addJob = jobObj => ajax.post("/student/addJob", jobObj);
// 更新就业信息
export const updateJob = jobObj => ajax.post("/student/updateJob", jobObj);
// 删除就业信息
export const removeJob = job_id =>
  ajax.get("/student/removeJob", {
    params: {
      job_id
    }
  });
// 分页查询学生就业信息
export const queryJob = (
  currentPage = 1,
  pageSize = 10,
  class_id = "",
  specialty = "",
  user_name = ""
) =>
  ajax.get("/student/queryJob", {
    params: { currentPage, pageSize, class_id, specialty, user_name }
  });
