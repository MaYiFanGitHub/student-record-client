<template>
  <div id="app">
    <router-view></router-view>
    <a href="#" id="golbalDownload" target="_blank"></a>
  </div>
</template>
<script>
export default {
  created() {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("messageStore", JSON.stringify(this.$store.state));
    });

    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("messageStore") &&
      this.$store.replaceState(
        Object.assign(
          this.$store.state,
          JSON.parse(localStorage.getItem("messageStore"))
        )
      );
  }
};
</script>
<style lang="scss">
#app {
  height: 100%;
}
#nprogress .bar {
  background: #409eff !important; //自定义颜色
}
// 动画过渡
// .fade-enter-active,
// .fade-leave-active {
//   transition: all 0.5s;
// }
// .fade-leave-to {
//   display: none;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
// }
</style>
