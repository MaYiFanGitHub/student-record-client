import ajax from "@u/ajax.js";

// 添加学籍异动
export const addRoll = rollObj => ajax.post("/roll/add", rollObj);
// 修改学籍异动
export const updateRoll = rollObj => ajax.post("/roll/edit", rollObj);
// 查询个人学籍异动
export const queryPersonRoll = (student_id, state) =>
  ajax.get("/roll/personRoll", {
    params: {
      student_id,
      state
    }
  });
// 删除个人学籍异动
export const removeRoll = roll_id =>
  ajax.get("/roll/removeRoll", {
    params: {
      roll_id
    }
  });
// 分页获取成绩异动
export const getAllRoll = (
  currentPage = 1,
  pageSize = 10,
  class_id = "",
  specialty = ""
) =>
  ajax.get("/roll/all", {
    params: { currentPage, pageSize, class_id, specialty }
  });
