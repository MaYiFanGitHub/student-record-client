const menuList = [
  {
    id: "/welcome",
    title: "首页",
    icon: "el-icon-location"
  },
  {
    id: "/role",
    title: "角色管理",
    icon: "el-icon-s-opportunity"
  },
  {
    id: "/user",
    title: "用户管理",
    icon: "el-icon-user-solid",
    children: [
      {
        id: "/user/userAdd",
        title: "添加用户"
      },
      {
        id: "/user/userList",
        title: "用户列表"
      }
    ]
  },
  {
    id: "/college",
    title: "学院管理",
    icon: "el-icon-office-building",
    children: [
      {
        id: "/college/add",
        title: "学院添加"
      },
      {
        id: "/college/list",
        title: "学院列表"
      }
    ]
  },
  {
    id: "/major",
    title: "专业管理",
    icon: "el-icon-office-building",
    children: [
      {
        id: "/major/add",
        title: "专业添加"
      },
      {
        id: "/major/list",
        title: "专业列表"
      }
    ]
  },
  {
    id: "/class",
    title: "班级管理",
    icon: "el-icon-price-tag",
    children: [
      {
        id: "/class/add",
        title: "班级添加"
      },
      {
        id: "/class/list",
        title: "班级列表"
      }
    ]
  },
  {
    id: "/course",
    title: "课程管理",
    icon: "el-icon-attract",
    children: [
      {
        id: "/course/add",
        title: "课程添加"
      },
      {
        id: "/course/list",
        title: "课程列表"
      }
    ]
  },
  {
    id: "/score",
    title: "成绩管理",
    icon: "el-icon-mobile",
    children: [
      {
        id: "/score/add",
        title: "成绩录入"
      },
      {
        id: "/score/list",
        title: "成绩查询"
      },
      {
        id: "/score/studentList",
        title: "个人成绩"
      },
      {
        id: "/score/examine",
        title: "成绩复议审批"
      }
    ]
  },
  {
    id: "/person",
    title: "个人资料管理",
    icon: "el-icon-notebook-2",
    children: [
      {
        id: "/person/add",
        title: "个人资料录入"
      },
      {
        id: "/person/password",
        title: "密码修改"
      }
    ]
  },

  {
    id: "/roll",
    title: "学籍管理",
    icon: "el-icon-suitcase-1",
    children: [
      {
        id: "/roll/list",
        title: "学籍异动审批"
      },
      {
        id: "/roll/add",
        title: "学籍异动申请"
      },
      {
        id: "/roll/person",
        title: "个人学籍异动查询"
      }
    ]
  },
  {
    id: "/honor",
    title: "奖惩信息管理",
    icon: "el-icon-set-up",
    children: [
      {
        id: "/honor/add",
        title: "奖惩活动添加"
      },
      {
        id: "/honor/list",
        title: "奖惩活动列表"
      },
      {
        id: "/honor/query",
        title: "奖惩信息查询"
      }
    ]
  },
  {
    id: "/job",
    title: "就业信息管理",
    icon: "el-icon-date",
    children: [
      {
        id: "/job/add",
        title: "就业信息登记"
      },
      {
        id: "/job/list",
        title: "就业信息列表"
      }
    ]
  },
  {
    id: "/studentInfo/list",
    title: "学生基本信息管理",
    icon: "el-icon-folder-opened"
  }
];

export default menuList;
