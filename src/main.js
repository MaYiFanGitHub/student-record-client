import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; //这个样式必须引入
import util from "./util/index";

// 样式重置
import "./assets/css/reset.css";

// 引入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.prototype.$ = util;
Vue.config.productionTip = false;
Vue.use(ElementUI);
// 简单配置
NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
