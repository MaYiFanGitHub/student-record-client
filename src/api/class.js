import ajax from "@u/ajax.js";

// 添加班级
export const addClass = classObj => ajax.post("/class/add", classObj);
// 分页获取所有班级
export const getAllClass = (
  currentPage = 1,
  pageSize = 10,
  college_id = "",
  class_name = "",
  specialty = ""
) =>
  ajax.get("/class/all", {
    params: { currentPage, pageSize, college_id, class_name, specialty }
  });
// 修改班级
export const editClass = classObj => ajax.post("/class/edit", classObj);
// 删除班级
export const removeClass = class_id =>
  ajax.get("/class/remove", { params: { class_id } });
// 获取所有班级
export const queryClassAll = () => ajax.get("/class/queryList");
