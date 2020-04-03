let $ = {
  // 跳转登录页
  gotoLogin() {
    window.location.href = "/login?returnurl=" + escape(window.location.href);
  }
};

export default $;
