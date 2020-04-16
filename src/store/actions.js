import { RECEIVE_ROLL_ALL } from "./mutations_type";
import { getAllRole } from "@api/role.js";

export default {
  // 获取所有角色
  async getAllRoll({ commit }) {
    const result = await getAllRole();
    commit(RECEIVE_ROLL_ALL, result);
  }
};
