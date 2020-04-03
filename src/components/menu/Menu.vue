<template>
  <el-menu :default-active="menuActive" class="el-menu-vertical-demo" router>
    <label v-for="menu in menuList" :key="menu.url">
      <!-- 下拉菜单 -->
      <el-submenu :index="menu.url" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="menuItem in menu.children"
            :key="menuItem.url"
            :index="menuItem.url"
          >
            {{ menuItem.title }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 单菜单 -->
      <el-menu-item :index="menu.url" v-else>
        <i class="el-icon-menu"></i>
        <span slot="title">{{ menu.title }}</span>
      </el-menu-item>
    </label>
  </el-menu>
</template>

<script>
import menuList from "./menuConfig";
export default {
  data() {
    return {
      menuList,
      menuActive: "welcome"
    };
  },
  mounted() {
    this.$openMenu();
  },
  methods: {
    $openMenu() {
      const path = this.$route.path;
      menuList.find(menu => {
        if (menu.children) {
          const res = menu.children.find(menuChild => menuChild.url === path);
          if (res) {
            this.menuActive = res.url;
            return true;
          }
        } else {
          if (menu.url === path) {
            this.menuActive = menu.url;
            return true;
          }
        }
      });
    }
  },
  watch: {
    "$route.path"() {
      this.$openMenu();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./Menu.scss";
</style>
