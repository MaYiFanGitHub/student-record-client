import {
  RECEIVE_ROLL_ALL,
  RECEIVE_USER_COLLEGE,
  LOGIN
} from "./mutations_type";

export default {
  // 获取所有角色
  [RECEIVE_ROLL_ALL](state, roleList) {
    state.roleList = roleList;
  },
  // 获取院长身份的用户
  [RECEIVE_USER_COLLEGE](state, userCollegeList) {
    state.userCollegeList = userCollegeList;
  },
  // 登录
  [LOGIN](state, userInfo) {
    state.userInfo = userInfo;
  }
};
