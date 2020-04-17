import ajax from "@u/ajax.js";

// 获取所有用户
export const getAllUser = () => ajax.get("/user/all");
// 添加用户
export const addUser = user => ajax.post("/user/add", user);
// 添加用户
export const addMoreUser = userList => ajax.post("/user/addMore", userList);
// 修改用户
export const editUser = user => ajax.post("/user/edit", user);
// 删除用户
export const removeUser = user_id =>
  ajax.get("/user/remove", { params: { user_id } });
