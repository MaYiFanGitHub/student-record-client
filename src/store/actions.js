import {
  INCREMENT,
  DECREMENT,
  INCREMENT_ASYNC,
  INCREMENT_IF_ODD
} from "./mutations_type";

export default {
  increment({ commit }) {
    commit(INCREMENT);
  },
  decrement({ commit }) {
    commit(DECREMENT);
  },
  incrementIfOdd({ commit, state }) {
    if (state.count % 2 === 1) {
      commit(INCREMENT_IF_ODD);
    }
  },
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit(INCREMENT_ASYNC);
    }, 1000);
  }
};
