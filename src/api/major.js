import ajax from "@u/ajax.js";

// 添加专业
export const addMajor = major => ajax.post("/major/add", major);
// 分页获取所有学院
export const getAllMajor = (
  currentPage = 1,
  pageSize = 10,
  specialty_name = "",
  college_id = ""
) =>
  ajax.get("/major/all", {
    params: { currentPage, pageSize, specialty_name, college_id }
  });
// 修改学院
export const editMajor = major => ajax.post("/major/edit", major);
// 删除学院
export const removeMajor = specialty =>
  ajax.get("/major/remove", { params: { specialty } });
// 查询本学院的专业和班级
export const queryMajorAndClass = () => ajax.get("/major/queryMajorAndClass");
