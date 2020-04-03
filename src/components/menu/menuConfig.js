const menuList = [
  {
    url: "home",
    title: "首页",
    icon: "el-icon-location"
  },
  {
    url: "title",
    title: "一级菜单",
    icon: "el-icon-location",
    children: [
      {
        url: "title1",
        title: "一级菜单-1"
      },
      {
        url: "title2",
        title: "一级菜单-2"
      },
      {
        url: "title3",
        title: "一级菜单-3"
      }
    ]
  },
  {
    url: "test",
    title: "test菜单",
    icon: "el-icon-location"
  },
  {
    url: "title-2",
    title: "菜单2",
    icon: "el-icon-location",
    children: [
      {
        url: "title21",
        title: "二级菜单-1"
      },
      {
        url: "title22",
        title: "二级菜单-2"
      }
    ]
  }
];

export default menuList;
