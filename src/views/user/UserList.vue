<template>
  <div class="user-list">
    <div class="user-list-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="formInline.user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="formInline.region" placeholder="权限">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formInline.user" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-list-footer">
      <el-table :data="userList" stripe style="width: 100%" border>
        <el-table-column label="id" width="50" type="index"></el-table-column>
        <el-table-column
          prop="user_username"
          label="用户名"
          align="center"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="role"
          label="权限"
          align="center"
          min-width="80"
        ></el-table-column>
        <el-table-column
          prop="user_name"
          label="姓名"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="user_last_name"
          label="曾用名"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="user_sex"
          label="性别"
          align="center"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="user_age"
          label="年龄"
          align="center"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="user_nation"
          label="民族"
          align="center"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="user_tel"
          label="手机"
          align="center"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="user_birthday"
          label="出生日期"
          align="center"
          min-width="130"
        ></el-table-column>
        <el-table-column
          prop="user_address"
          label="籍贯"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="user_heath"
          label="健康状况"
          align="center"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="user_culture"
          label="文化程度"
          align="center"
          min-width="100"
        ></el-table-column>

        <el-table-column align="center" fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleClick(scope.row, true)"
              icon="el-icon-edit"
              circle
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              @click="handleClick(scope.row, false)"
              icon="el-icon-delete"
              circle
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>

    <el-dialog title="修改用户信息" :visible.sync="dialogVisible" width="70%">
      <userForm
        :dialogVisible="dialogVisible"
        :editUserObj="editUserObj"
        ref="userFormEle"
      ></userForm>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseBtn(false)">取 消</el-button>
        <el-button type="primary" @click="handleCloseBtn(true)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userForm from "./UserForm";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
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
      dialogVisible: false,
      editUserObj: {}
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row, flag) {
      if (flag) {
        // 编辑
        this.dialogVisible = true;
        this.editUserObj = Object.assign({}, row);
      } else {
        // 删除
        this.$confirm("确定要删除此记录吗？是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    handleCloseBtn(flag) {
      if (flag) {
        this.$refs.userFormEle.onSubmit();
        const reuslt = this.$refs.userFormEle.isSuccess;
        if (reuslt) {
          this.dialogVisible = false;
        }
      } else {
        this.$refs.userFormEle.resetForm();
        this.dialogVisible = false;
      }
    }
  },
  components: {
    userForm
  }
};
</script>

<style lang="scss" scoped>
@import "./UserList.scss";
</style>
