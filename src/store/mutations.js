import {
  INCREMENT,
  DECREMENT,
  INCREMENT_ASYNC,
  INCREMENT_IF_ODD
} from "./mutations_type";

export default {
  [INCREMENT](state) {
    state.count++;
  },
  [DECREMENT](state) {
    state.count--;
  },
  [INCREMENT_ASYNC](state) {
    state.count++;
  },
  [INCREMENT_IF_ODD](state) {
    state.count++;
  }
};
