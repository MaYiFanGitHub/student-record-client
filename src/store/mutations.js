import { RECEIVE_ROLL_ALL } from "./mutations_type";

export default {
  // 获取所有角色
  [RECEIVE_ROLL_ALL](state, roleList) {
    state.roleList = roleList;
  }
};
