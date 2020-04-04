<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
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
