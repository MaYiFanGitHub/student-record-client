import ajax from "@u/ajax.js";

// 分页获取所有学院
export const getAllCollege = (
  currentPage = 1,
  pageSize = 10,
  college_name = "",
  user_name = ""
) =>
  ajax.get("/college/all", {
    params: { currentPage, pageSize, college_name, user_name }
  });
// 添加学院
export const addCollege = college => ajax.post("/college/add", college);
// 修改学院
export const editCollege = college => ajax.post("/college/edit", college);
// 删除用户
export const removeCollege = college_id =>
  ajax.get("/college/remove", { params: { college_id } });

// 获取所有学院
export const getCollegeSelect = () => ajax.get("/college/select");
