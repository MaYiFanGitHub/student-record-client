<template>
  <div class="exception">
    <div class="imgBlock">
      <div class="imgEle"></div>
    </div>
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在或仍在开发中</div>
      <div class="actions">
        <el-button type="primary" @click="goToHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToHome() {
      this.$router.replace("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.exception {
  display: flex;
  align-items: center;
  height: 80%;
  min-height: 500px;
  .imgBlock {
    width: 42.5%;
    padding-right: 152px;
    zoom: 1;
    .imgEle {
      background: url("~@a/images/404.svg");
      float: right;
      width: 100%;
      max-width: 430px;
      height: 360px;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: contain;
    }
  }
  .content {
    flex: auto;
    h1 {
      margin-bottom: 24px;
      color: #434e59;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }
    .desc {
      margin-bottom: 16px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
