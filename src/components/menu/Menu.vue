<template>
  <el-menu
    default-active="home"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
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
      menuList
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./Menu.scss";
</style>
