import ajax from "@u/ajax.js";

// 添加奖惩信息
export const addHonor = honorObj => ajax.post("/student/addHonor", honorObj);
// 更新奖惩信息
export const updateHonor = honorObj =>
  ajax.post("/student/updateHonor", honorObj);
// 获取奖惩信息
export const queryHonor = (student_id, honor_type) =>
  ajax.get("/student/queryHonor", {
    params: {
      student_id,
      honor_type
    }
  });
// 删除奖惩信息
export const removeHonor = honor_id =>
  ajax.get("/student/removeHonor", {
    params: {
      honor_id
    }
  });
