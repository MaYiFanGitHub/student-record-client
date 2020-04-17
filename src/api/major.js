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
