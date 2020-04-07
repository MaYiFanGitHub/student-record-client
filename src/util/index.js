let $ = {
  // 跳转登录页
  gotoLogin() {
    window.location.href = "/login?returnurl=" + escape(window.location.href);
  },
  formatDate(numb, format = "-") {
    if (numb != undefined) {
      let time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      let year = time.getFullYear() + "";
      let month = time.getMonth() + 1 + "";
      let date = time.getDate() + "";
      if (format && format.length === 1) {
        return year + format + month + format + date;
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    } else {
      return undefined;
    }
  }
};

export default $;
