<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside class="home-aside" width="200px">
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
          <router-view></router-view>
        </el-main>
        <el-footer class="home-footer">
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "../../components/menu/Menu";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default {
  created() {
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
    },
    breadList() {
      console.log("111");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./Home.scss";
</style>
