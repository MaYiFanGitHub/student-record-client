<template>
  <div class="user-form">
    <el-form ref="userObj" :model="userObj" label-width="80px" :rules="rules">
      <el-page-header
        @back="goBack"
        content="用户编辑"
        v-if="$route.params.flag"
      >
      </el-page-header>
      <el-col :span="8" :offset="2">
        <el-form-item label="用户名" prop="user_username">
          <el-input
            v-model="userObj.user_username"
            :disabled="$route.params.flag"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item
          label="密码"
          prop="user_password"
          v-if="!$route.params.flag"
        >
          <el-input v-model="userObj.user_password" show-password></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8" :offset="2">
        <el-form-item label="权限" prop="role_id">
          <el-select
            v-model="userObj.role_id"
            placeholder="请选择"
            style="width:100%"
            :disabled="$route.params.flag"
          >
            <el-option
              :label="role.role_name"
              :value="role.role_id"
              v-for="role in roleListComputed"
              :key="role.role_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item label="姓名">
          <el-input v-model="userObj.user_name"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8" :offset="2">
        <el-form-item label="曾用名">
          <el-input v-model="userObj.user_last_name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item label="性别">
          <el-radio v-model="userObj.user_sex" label="男">男</el-radio>
          <el-radio v-model="userObj.user_sex" label="女">女</el-radio>
        </el-form-item>
      </el-col>

      <el-col :span="8" :offset="2">
        <el-form-item label="年龄">
          <el-input
            type="age"
            v-model.number="userObj.user_age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8" :offset="2">
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

      <el-col :span="8" :offset="2">
        <el-form-item label="手机">
          <el-input v-model="userObj.user_tel"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
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

      <el-col :span="8" :offset="2">
        <el-form-item label="籍贯">
          <el-input v-model="userObj.user_address"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item label="健康状况">
          <el-input v-model="userObj.user_heath"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8" :offset="2">
        <el-form-item label="文化程度">
          <el-select
            v-model="userObj.user_culture"
            placeholder="请选择文化程度"
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
      <el-col
        :span="8"
        :offset="2"
        v-if="userObj.role_id === 2 || userObj.role_id === 4"
      >
        <el-form-item label="职称">
          <el-select
            v-model="userObj.teacher_title"
            placeholder="请选择职称"
            style="width:100%"
          >
            <el-option label="助教" value="助教"></el-option>
            <el-option label="讲师" value="讲师"></el-option>
            <el-option label="副教授" value="副教授"></el-option>
            <el-option label="教授" value="教授"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2" v-if="userObj.role_id === 3">
        <el-form-item label="政治面貌" prop="politics_status_id">
          <el-select
            v-model="userObj.politics_status_id"
            placeholder="请选择政治面貌"
            style="width:100%"
          >
            <el-option
              :label="role.politics_status"
              :value="role.politics_status_id"
              v-for="role in $store.state.politicsList"
              :key="role.politics_status_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2" v-if="userObj.role_id === 3">
        <el-form-item label="所属学院" prop="college_id">
          <el-select
            v-model="userObj.college_id"
            placeholder="请选择所属学院"
            style="width:100%"
            @change="collegeChange"
            disabled
          >
            <el-option
              v-for="college in collegeList"
              :key="college.college_id"
              :label="college.college_name"
              :value="college.college_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2" v-if="userObj.role_id === 3">
        <el-form-item label="所属专业" prop="specialty">
          <el-select
            v-model="userObj.specialty"
            placeholder="请选择"
            style="width:100%"
            @change="marjorChange"
          >
            <el-option
              v-for="major in majorList"
              :key="major.specialty"
              :label="major.specialty_name"
              :value="major.specialty"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2" v-if="userObj.role_id === 3">
        <el-form-item label="所属班级" prop="class_id">
          <el-select
            v-model="userObj.class_id"
            placeholder="请选择班级"
            style="width:100%"
          >
            <el-option
              v-for="item in classList"
              :key="item.class_id"
              :label="item.class_name"
              :value="item.class_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="21" :offset="2">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import { addUser, editUser } from "@api/user";
import { queryMajor } from "@api/college";
import { mapState } from "vuex";
export default {
  props: ["dialogVisible", "editUserObj"],
  async mounted() {
    this.$store.dispatch("getAllRoll");
    let res = await queryMajor();
    this.collegeList = res;
    const { flag, data } = this.$route.params;

    if (flag) {
      this.userObj = data;

      // 获取班级列表
      this.classList = Object.assign(
        {},
        this.$store.state.classList.filter(
          item => item.specialty === this.userObj.specialty
        )
      );
    }

    // 获取专业列表
    this.majorList = Object.assign(
      {},
      this.collegeList.find(
        college => college.college_id === this.userObj.college_id
      )["majorList"]
    );
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
        user_culture: "",
        teacher_title: "",
        politics_status_id: "",
        specialty: "",
        college_id: this.$store.state.userInfo.college_id,
        class_id: ""
      },
      collegeList: [],
      majorList: [],
      classList: [],
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
        },
        specialty: { required: true, message: "请选择专业", trigger: "blur" },
        college_id: { required: true, message: "请选择学院", trigger: "blur" },
        class_id: { required: true, message: "请选择班级", trigger: "blur" }
      },
      isSuccess: false
    };
  },
  methods: {
    onSubmit() {
      this.$refs["userObj"].validate(async valid => {
        if (valid) {
          let result;
          // 添加用户
          if (this.$route.params.flag) {
            result = await editUser(this.userObj);
          } else {
            result = await addUser(this.userObj);
          }

          if (result) {
            this.$message({
              type: "success",
              message: this.$route.params.flag ? "更新成功" : "添加成功!"
            });
            this.userObj = {};
          }
          if (this.$route.params.flag) {
            this.goBack();
          }
          this.isSuccess = true;
        } else {
          this.isSuccess = false;
        }
      });
    },
    resetForm() {
      this.$refs["userObj"].resetFields();
    },
    goBack() {
      this.$router.back();
    },
    collegeChange(params) {
      this.majorList = Object.assign(
        {},
        this.collegeList.find(college => college.college_id === params)[
          "majorList"
        ]
      );
      this.userObj.specialty = "";
    },
    marjorChange(params) {
      console.log(params);
      this.userObj.specialty = params;
      this.classList = Object.assign(
        {},
        this.$store.state.classList.filter(item => item.specialty === params)
      );
      // this.userObj.class_id = "";
      this.$set(this.userObj, "class_id", "");
    }
  },
  watch: {
    editUserObj() {
      this.userObj = Object.assign({}, this.editUserObj);
    }
  },
  computed: {
    ...mapState(["roleList"]),
    roleListComputed() {
      const role_id = this.$store.state.userInfo.role_id;

      return this.roleList.filter(item => {
        if (role_id === 0) {
          // 管理员
          if (item.role_id === 0 || item.role_id === 1) {
            return true;
          }
        } else if (role_id === 1) {
          // 院长
          if (item.role_id === 4) {
            return true;
          }
        } else if (role_id === 4) {
          // 教秘
          if (item.role_id === 2 || item.role_id === 3) {
            return true;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-form {
  background-color: #fff;
  .el-page-header {
    padding: 0px 30px 50px;
  }
}
.el-form {
  padding-top: 30px;
  background-color: #fff;
}
</style>
