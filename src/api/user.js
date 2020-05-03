import ajax from "@u/ajax.js";

// 获取所有用户
export const getAllUser = (
  currentPage = 1,
  pageSize = 10,
  user_username = "",
  user_name = "",
  role_id
) =>
  ajax.get("/user/all", {
    params: { user_username, role_id, user_name, currentPage, pageSize }
  });
// 添加用户
export const addUser = user => ajax.post("/user/add", user);
// 添加用户
export const addMoreUser = userList => ajax.post("/user/addMore", userList);
// 添加用户
export const addMoreTeacher = userList =>
  ajax.post("/user/addTeacher", userList);
// 修改用户
export const editUser = user => ajax.post("/user/edit", user);
// 删除用户
export const removeUser = user_username =>
  ajax.get("/user/remove", { params: { user_username } });
// 查询院长
export const findUserByCollege = () => ajax.get("/user/findDean");
// 登录
export const login = (user_username, user_password, role_id) =>
  ajax.post("/user/login", { user_username, user_password, role_id });
// 退出
export const logout = () => ajax.get("/user/logout");
