<template>
  <div class="welcome">
    <div>
      <p>你好, {{ $store.state.userInfo.user_name }}</p>
      <p>欢迎进入高校学生档案管理系统</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: "test"
    };
  }
};
</script>

<style lang="scss" scoped>
.welcome {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background: #fff;
  p {
    line-height: 48px;
    text-align: center;
  }
}
</style>
