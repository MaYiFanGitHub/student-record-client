<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside class="home-aside" width="210px">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-main class="home-main">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="(bread, index) in breadList"
              :key="index"
              :to="
                index !== breadList.length - 1 ? { path: bread.path } : false
              "
            >
              {{ bread.meta.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <div class="main-content">
            <router-view class="view"></router-view>
          </div>
          <el-footer class="home-footer">
            <Footer></Footer>
          </el-footer>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "@c/menu/Menu";
import Header from "@c/header/Header";
import Footer from "@c/footer/Footer";

export default {
  created() {
    if (!this.$store.state.userInfo.user_id) {
      this.$router.replace("/login");
    }
    this.getBreadList();
  },
  data() {
    return {
      breadList: []
    };
  },
  methods: {
    getBreadList() {
      let matched = [...this.$route.matched].splice(1);
      this.breadList = matched;
    }
  },
  components: {
    Menu,
    Header,
    Footer
  },
  watch: {
    $route() {
      this.getBreadList();
    }
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
  .home-header {
    height: 75px !important;
    border-bottom: 1px solid #e6e6e6;
  }
  .home-aside {
    height: 100%;
    border-right: 1px solid #e6e6e6;
  }
  .home-main {
    background: #fafafa;
    padding-bottom: 0px;
    .main-content {
      // width: 1200px;
      // margin: 0 auto;
      height: calc(100% - 120px);
    }
    .el-breadcrumb {
      margin-bottom: 20px;
      font-size: 16px;
    }
  }
  .home-footer {
    padding-top: 10px;
    color: #c8cdd0;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    height: 50px !important;
  }
}
</style>
