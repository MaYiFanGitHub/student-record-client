<template>
  <div style="height: 500px;background:red;">
    <div ref="div">欢迎页面{{ test }}</div>
    <router-link to="/welcome/test">跳转测试1</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    console.log("------", document.getElementById("app"));
  },
  created() {
    this.$nextTick(() => {
      console.log("nextTick");
    });
  },
  beforeMount() {
    console.log(typeof this.$refs);
    console.log("------", document.getElementById("app"));
  },
  mounted() {
    // debugger
    console.log("mounted");
    this.$nextTick(() => {
      console.log("mounted nextTick");
    });
  },
  data() {
    return {
      test: "test"
    };
  }
};
</script>

<style lang="scss" scoped></style>
