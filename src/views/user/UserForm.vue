<template>
  <div>
    <el-form ref="userObj" :model="userObj" label-width="80px" :rules="rules">
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="用户名" prop="user_username">
            <el-input v-model="userObj.user_username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密码" prop="user_password" v-if="!dialogVisible">
            <el-input v-model="userObj.user_password" show-password></el-input>
          </el-form-item>
          <el-form-item label="文化程度" v-if="dialogVisible">
            <el-select
              v-model="userObj.user_culture"
              placeholder="请选择民族"
              style="width:100%"
            >
              <el-option label="小学" value="小学"></el-option>
              <el-option label="初中" value="初中"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="研究生" value="研究生"></el-option>
              <el-option label="博士" value="博士"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="权限" prop="role_id">
            <el-select
              v-model="userObj.role_id"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                :label="role.role_name"
                :value="role.role_id"
                v-for="role in roleList"
                :key="role.role_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="userObj.user_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="曾用名">
            <el-input v-model="userObj.user_last_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别">
            <el-radio v-model="userObj.user_sex" label="男">男</el-radio>
            <el-radio v-model="userObj.user_sex" label="女">女</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="年龄">
            <el-input
              type="age"
              v-model.number="userObj.user_age"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="民族">
            <el-select
              v-model="userObj.user_nation"
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
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="手机">
            <el-input v-model="userObj.user_tel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="userObj.user_birthday"
              type="date"
              placeholder="选择日期"
              style="width:100%"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="籍贯">
            <el-input v-model="userObj.user_address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="健康状况">
            <el-input v-model="userObj.user_heath"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40" v-if="!dialogVisible">
        <el-col :span="8" :offset="3">
          <el-form-item label="文化程度">
            <el-select
              v-model="userObj.user_culture"
              placeholder="请选择民族"
              style="width:100%"
            >
              <el-option label="小学" value="小学"></el-option>
              <el-option label="初中" value="初中"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="研究生" value="研究生"></el-option>
              <el-option label="博士" value="博士"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!dialogVisible">
        <el-col :span="21" :offset="3">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addUser } from "@api/user";
export default {
  props: ["dialogVisible", "editUserObj", "roleList"],
  mounted() {
    if (this.editUserObj && this.editUserObj.role_id) {
      this.userObj = Object.assign({}, this.editUserObj);
    }
  },
  data() {
    return {
      userObj: {
        user_username: "",
        user_password: "",
        role_id: "",
        user_name: "",
        user_sex: "",
        user_age: "",
        user_address: "",
        user_nation: "",
        user_tel: "",
        user_birthday: "",
        user_last_name: "",
        user_heath: "",
        user_culture: ""
      },

      rules: {
        role_id: { required: true, message: "请选择权限", trigger: "blur" },
        user_username: {
          required: true,
          message: "请输入用户名",
          trigger: "blur"
        },
        user_password: {
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["userObj"].validate(async valid => {
        if (valid) {
          // 添加用户
          const result = await addUser(this.userObj);
          if (result) {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.userObj = {};
          }
          this.isSuccess = true;
          return true;
        } else {
          this.isSuccess = false;
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["userObj"].resetFields();
    }
  },
  watch: {
    editUserObj() {
      this.userObj = Object.assign({}, this.editUserObj);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 30px;
  background-color: #fff;
}
</style>
