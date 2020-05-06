import {
  RECEIVE_ROLL_ALL,
  RECEIVE_USER_COLLEGE,
  LOGIN,
  QUERY_POLITICS,
  QUERY_CLASS,
  RECEIVE_TEACHER_USER
} from "./mutations_type";

import { getAllRole } from "@api/role.js";
import { findUserByCollege, findTeacher } from "@api/user.js";
import { queryPolitics } from "@api/politics";
import { queryClassAll } from "@api/class";

export default {
  // 获取所有角色
  async getAllRoll({ commit }) {
    let result = await getAllRole();
    result.forEach(item => (item.role_rank = JSON.parse(item.role_rank)));
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
  },
  // 获取所有政治面貌字典表
  async getAllPolitics({ commit }) {
    let result = await queryPolitics();
    commit(QUERY_POLITICS, result);
  },
  // 获取所有班级
  async getAllClass({ commit }) {
    let result = await queryClassAll();
    commit(QUERY_CLASS, result);
  },
  // 获取教师身份的角色
  async getUserTeacher({ commit }) {
    const result = await findTeacher();
    commit(RECEIVE_TEACHER_USER, result);
  }
};
