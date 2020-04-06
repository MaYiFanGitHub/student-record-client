<template>
  <div class="user-add">
    <el-tabs v-model="activeName">
      <el-tab-pane label="添加单个用户" name="first">
        <UserForm></UserForm>
      </el-tab-pane>
      <el-tab-pane label="批量导入用户" name="second">
        <div class="user-add-header cl">
          <el-button type="primary" class="fr" icon="el-icon-bottom-right"
            >导入用户</el-button
          >
          <el-button type="text" class="fr">下载导入模板</el-button>
        </div>
        <div class="user-add-content">
          <div>
            <el-button type="text" class="fl all" @click="allDelete"
              >批量删除</el-button
            >
          </div>
          <el-table
            ref="multipleTable"
            :data="userList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column
              label="序号"
              width="50"
              type="index"
            ></el-table-column>
            <el-table-column label="用户名" min-width="170" align="center">
              <template slot-scope="scope"
                ><el-input v-model="scope.row.user_username"></el-input
              ></template>
            </el-table-column>
            <el-table-column label="密码" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.user_password"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="权限" min-width="170" align="center">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.role_id"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option label="管理员" :value="0"></el-option>
                  <el-option label="院长" :value="1"></el-option>
                  <el-option label="教师" :value="2"></el-option>
                  <el-option label="学生" :value="3"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="姓名" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.user_name"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="曾用名" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.user_last_name"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="性别" min-width="170" align="center">
              <template slot-scope="scope">
                <el-radio v-model="scope.row.user_sex" label="男">男</el-radio>
                <el-radio v-model="scope.row.user_sex" label="女">女</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="年龄" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-model.number="scope.row.user_age"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="民族" min-width="170" align="center">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.user_nation"
                  placeholder="请选择民族"
                  style="width:100%"
                >
                  <el-option label="汉族" value="汉族"></el-option>
                  <el-option label="土家族" value="土家族"></el-option>
                  <el-option label="蒙古族" value="蒙古族"></el-option>
                  <el-option label="回族" value="回族"></el-option>
                  <el-option label="苗族" value="苗族"></el-option>
                  <el-option label="满族" value="满族"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="手机" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.user_tel"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="出生日期" min-width="170" align="center">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.user_birthday"
                  type="date"
                  placeholder="选择日期"
                  style="width:100%"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="籍贯" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.user_address"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="健康状况" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.user_heath"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="文化程度" min-width="170" align="center">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.user_culture"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option label="小学" value="小学"></el-option>
                  <el-option label="初中" value="初中"></el-option>
                  <el-option label="高中" value="高中"></el-option>
                  <el-option label="本科" value="本科"></el-option>
                  <el-option label="研究生" value="研究生"></el-option>
                  <el-option label="博士" value="博士"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  circle
                  @click="addOrRemove(scope, true)"
                  :disabled="userList.length === 1"
                ></el-button>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  circle
                  v-if="scope.$index === userList.length - 1"
                  @click="addOrRemove(scope, false)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="user-add-footer">
          <el-button type="primary">提交</el-button>
          &nbsp;&nbsp;
          <el-button>重置</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserForm from "./UserForm";
export default {
  data() {
    return {
      userList: [
        {
          user_username: "user1",
          user_password: "123",
          role_id: 1,
          user_name: "张三",
          user_sex: "男",
          user_age: 19,
          user_address: "河北省邯郸市",
          user_nation: "汉族",
          user_tel: "13731002865",
          user_birthday: Date.now(),
          user_last_name: "李四",
          user_heath: "健康",
          user_culture: "本科"
        }
      ],
      multipleSelection: [],
      activeName: "second",
      userObj: {
        user_username: "user1",
        user_password: "123",
        role_id: 1,
        user_name: "张三",
        user_sex: "男",
        user_age: 19,
        user_address: "河北省邯郸市",
        user_nation: "汉族",
        user_tel: "13731002865",
        user_birthday: Date.now(),
        user_last_name: "李四",
        user_heath: "健康",
        user_culture: "本科"
      },
      count: 0
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    addOrRemove(scope, flag) {
      console.log(scope);
      if (flag) {
        // 删除
        if (this.userList.length !== 1) {
          this.userList.splice(scope.$index, 1);
        }
      } else {
        // 添加
        this.userList.push({});
      }
    },
    allDelete() {
      const res = this.userList.filter(
        item => this.multipleSelection.indexOf(item) === -1
      );
      this.userList = res;

      if (this.userList.length === 0) {
        this.userList.push({});
      }
    }
  },
  components: {
    UserForm
  }
};
</script>

<style lang="scss" scoped>
@import "./AddUser.scss";
</style>
