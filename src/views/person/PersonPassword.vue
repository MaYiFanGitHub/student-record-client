<template>
  <div class="password">
    <h1></h1>
    <div class="form-box">
      <h1>密码修改</h1>
      <el-form
        :model="userForm"
        status-icon
        :rules="rules"
        ref="userForm"
        class="login-form"
        style="width:400px;margin: 0 auto"
      >
        <el-form-item>
          <el-input
            type="text"
            v-model="userForm.username"
            autocomplete="off"
            placeholder="请输入账号"
            disabled
            ><i slot="prefix" class="el-input__icon el-icon-user"></i
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="userForm.password"
            autocomplete="off"
            placeholder="请输入新密码"
            ><i slot="prefix" class="el-input__icon el-icon-lock"></i
          ></el-input>
        </el-form-item>
        <el-form-item prop="repeatPassword">
          <el-input
            type="password"
            v-model="userForm.repeatPassword"
            autocomplete="off"
            placeholder="请再次输入密码"
            ><i slot="prefix" class="el-input__icon el-icon-lock"></i
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="login('userForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updatePassword, logout } from "@api/user";
export default {
  data() {
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入确认密码"));
      }
      if (this.userForm.password !== value) {
        return callback(new Error("两次密码输入不一致"));
      }
      callback();
    };
    return {
      userForm: {
        username: this.$store.state.userInfo.user_username,
        password: "",
        repeatPassword: ""
      },
      rules: {
        username: { required: true, message: "请输入用户名", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" },
        repeatPassword: {
          validator: checkPassword,
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    login() {
      this.$refs["userForm"].validate(async valid => {
        if (valid) {
          // const { username, password, role } = this.userForm;
          // const result = await login(username, password, role);
          // console.log(valid);
          // if (result) {
          //   this.$message({
          //     type: "success",
          //     message: "登录成功"
          //   });
          //   this.$store.dispatch("login", result);
          //   this.$router.replace("/welcome");
          // } else {
          //   this.$message({
          //     type: "error",
          //     message: "登录失败"
          //   });
          // }
          let user_id = this.$store.state.userInfo.user_id;
          let res = await updatePassword(this.userForm.password, user_id);
          if (res) {
            this.$message({
              type: "success",
              message: "修改密码成功"
            });
            await logout();
            this.$store.dispatch("login", {});
            this.$router.replace("/login");
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.password {
  width: 1200px;
  height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  h1 {
    text-align: center;
    font-size: 24px;
    line-height: 64px;
    letter-spacing: 5px;
  }
  button {
    width: 100px;
  }
}
</style>
