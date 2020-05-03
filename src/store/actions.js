import {
  RECEIVE_ROLL_ALL,
  RECEIVE_USER_COLLEGE,
  LOGIN
} from "./mutations_type";

import { getAllRole } from "@api/role.js";
import { findUserByCollege } from "@api/user.js";

export default {
  // 获取所有角色
  async getAllRoll({ commit }) {
    const result = await getAllRole();
    commit(RECEIVE_ROLL_ALL, result);
  },
  // 获取院长身份的角色
  async getUserCollege({ commit }) {
    const result = await findUserByCollege();
    commit(RECEIVE_USER_COLLEGE, result);
  },
  // 登录
  async login({ commit }, userInfo) {
    commit(LOGIN, userInfo);
  }
};
