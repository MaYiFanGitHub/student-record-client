import axios from "axios";

// 本地地址
// axios.defaults.baseURL = "//localhost:3000/api";
// 线上地址
axios.defaults.baseURL = "//feifan.info:3000/api";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
  return config;
});

axios.interceptors.response.use(
  response => {
    let { data: result } = response;

    if (result.code === 200) {
      // 请求成功
      return result.data || true;
    } else {
      // 请求失败
      return false;
    }
  },
  error => {
    alert("请求出错", error);
    // 中断 promise链
    return new Promise(() => {});
  }
);

export default axios;
