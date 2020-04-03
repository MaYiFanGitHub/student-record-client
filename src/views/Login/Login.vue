<template>
  <div id="login-box">
    <div class="login cl">
      <div class="left fl">
        <!-- <h1>高校学生档案管理系统</h1> -->
      </div>
      <div class="right fr">
        <div class="form-box">
          <h1>登录</h1>
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            class="login-form"
          >
            <el-form-item prop="username">
              <el-input
                type="text"
                v-model="loginForm.username"
                autocomplete="off"
                placeholder="请输入账号"
                ><i slot="prefix" class="el-input__icon el-icon-user"></i
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
                placeholder="请输入密码"
                ><i slot="prefix" class="el-input__icon el-icon-lock"></i
              ></el-input>
            </el-form-item>
            <el-form-item prop="role">
              <el-radio v-model="loginForm.role" :label="1">管理员</el-radio>
              <el-radio v-model="loginForm.role" :label="2">院长</el-radio>
              <el-radio v-model="loginForm.role" :label="3">教师</el-radio>
              <el-radio v-model="loginForm.role" :label="4">学生</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="login('loginForm')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        role: 1
      },
      rules: {
        username: { required: true, message: "请输入用户名", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" }
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scope>
@import "./Login.scss";
</style>
