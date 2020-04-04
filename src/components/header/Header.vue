<template>
  <div class="header">
    <div class="logo fl">
      <img src="@a/logo.png" alt="" srcset="" />
      <span>高校学生档案管理系统</span>
    </div>
    <div class="user fr">
      <img src="@a/logo.png" alt="" srcset="" />
      <p>
        你好，<span>mayifan</span
        ><el-button type="text" @click="open">退出</el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    open() {
      this.$confirm("是否要退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./header.scss";
</style>
