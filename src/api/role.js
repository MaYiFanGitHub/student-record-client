import ajax from "@u/ajax.js";

// 获取所有角色
export const getAllRole = () => ajax.get("/role/all");
// 添加角色
export const addRole = role => ajax.post("/role/add", role);
// 修改角色
export const editRole = role => ajax.post("/role/edit", role);
// 删除角色
export const removeRole = role_id =>
  ajax.get("/role/remove", { params: { role_id } });
