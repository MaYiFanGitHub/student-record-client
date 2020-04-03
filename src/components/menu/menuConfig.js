const menuList = [
  {
    url: "/welcome",
    title: "首页",
    icon: "el-icon-location"
  },
  {
    url: "/title",
    title: "用户管理",
    icon: "el-icon-user-solid",
    children: [
      {
        url: "/test",
        title: "添加用户"
      },
      {
        url: "/title2",
        title: "用户列表"
      }
    ]
  },
  {
    url: "/test1112",
    title: "个人资料管理",
    icon: "el-icon-notebook-2",
    children: [
      {
        url: "/title211",
        title: "个人资料录入"
      },
      {
        url: "/title221",
        title: "密码修改"
      }
    ]
  },
  {
    url: "/title-2",
    title: "学院管理",
    icon: "el-icon-office-building",
    children: [
      {
        url: "/title21",
        title: "学院添加"
      },
      {
        url: "/1title221",
        title: "学院列表"
      }
    ]
  },
  {
    url: "/title-3",
    title: "班级管理",
    icon: "el-icon-price-tag",
    children: [
      {
        url: "/title221",
        title: "班级添加"
      },
      {
        url: "/title222",
        title: "班级列表"
      }
    ]
  },
  {
    url: "/title-4",
    title: "课程管理",
    icon: "el-icon-attract",
    children: [
      {
        url: "/title2111",
        title: "课程添加"
      },
      {
        url: "/title21112",
        title: "课程列表"
      }
    ]
  },
  {
    url: "/title-5",
    title: "成绩管理",
    icon: "el-icon-mobile",
    children: [
      {
        url: "/title12111",
        title: "成绩录入"
      },
      {
        url: "/ti2tle121112",
        title: "成绩查询"
      },
      {
        url: "/titl1e22",
        title: "成绩复议审批"
      }
    ]
  },
  {
    url: "title-6",
    title: "学籍管理",
    icon: "el-icon-suitcase-1",
    children: [
      {
        url: "title21",
        title: "学籍异动审批"
      },
      {
        url: "titl123e122",
        title: "学籍异动申请"
      },
      {
        url: "title422",
        title: "学籍查询"
      }
    ]
  },
  {
    url: "title-81",
    title: "奖惩信息管理",
    icon: "el-icon-set-up",
    children: [
      {
        url: "title621",
        title: "奖惩活动添加"
      },
      {
        url: "titl1234e122",
        title: "奖惩活动列表"
      }
    ]
  },
  {
    url: "title-9",
    title: "就业信息管理",
    icon: "el-icon-date",
    children: [
      {
        url: "title6201",
        title: "就业信息登记"
      },
      {
        url: "titl12340e122",
        title: "就业信息列表"
      }
    ]
  },
  {
    url: "title-8",
    title: "学生基本信息管理",
    icon: "el-icon-folder-opened",
    children: [
      {
        url: "title6218",
        title: "学生基本信息添加"
      },
      {
        url: "titl1234e1227",
        title: "学生基本信息列表"
      }
    ]
  }
];

export default menuList;
