const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("@c", resolve("./src/components"))
      .set("@s", resolve("./src/store"))
      .set("@a", resolve("./src/assets"))
      .set("@v", resolve("./src/views"));
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/css/common.scss";`
      }
    }
  }
};
