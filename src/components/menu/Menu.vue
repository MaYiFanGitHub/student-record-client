<template>
  <el-menu :default-active="menuActive" class="el-menu-vertical-demo" router>
    <label v-for="menu in menuList" :key="menu.id">
      <!-- 下拉菜单 -->
      <el-submenu :index="menu.id" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="menuItem in menu.children"
            :key="menuItem.id"
            :index="menuItem.id"
          >
            {{ menuItem.title }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 单菜单 -->
      <el-menu-item :index="menu.id" v-else>
        <i :class="menu.icon"></i>
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
          const res = menu.children.find(menuChild => menuChild.id === path);
          if (res) {
            this.menuActive = res.id;
            return true;
          }
        } else {
          if (menu.id === path) {
            this.menuActive = menu.id;
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
  },
  computed: {
    showMenuList() {
      let userMenuList = JSON.parse(this.$store.state.userInfo.role_rank || []);
      console.log(userMenuList);
      return menuList;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./Menu.scss";
</style>
