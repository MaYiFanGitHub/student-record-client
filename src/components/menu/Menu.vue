<template>
  <el-menu :default-active="menuActive" class="el-menu-vertical-demo" router>
    <label v-for="menu in userMenuList" :key="menu.id">
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
      userMenuList: [],
      menuActive: "welcome",
      userMenus: []
    };
  },
  mounted() {
    // let menuObjList = JSON.parse(this.$store.state.userInfo.role_rank);
    this.userMenus = JSON.parse(this.$store.state.userInfo.role_rank);
    console.log(this.userMenus);
    let res = this.getMenuNodes(menuList);
    this.userMenuList = res;
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
    },
    hasAuth(item) {
      // 判断当前登陆用户是否有对item的权限
      const menus = this.userMenus;
      if (item.id === "/welcome" || menus.indexOf(item.id) !== -1) {
        return true;
      } else if (item.children) {
        const cItem = item.children.find(
          cItem => menus.indexOf(cItem.id) !== -1
        );
        return !!cItem;
      }
      return false;
    },
    getMenuNodes(menuList) {
      return menuList.reduce((pre, item) => {
        if (this.hasAuth(item)) {
          if (!item.children) {
            pre.push({
              id: item.id,
              title: item.title,
              icon: item.icon
            });
          } else {
            pre.push({
              id: item.id,
              title: item.title,
              icon: item.icon,
              children: this.getMenuNodes(item.children)
            });
          }
        }
        return pre;
      }, []);
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
