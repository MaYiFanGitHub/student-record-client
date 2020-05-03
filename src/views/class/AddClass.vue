<template>
  <div class="add-major">
    <el-form
      ref="classObj"
      :model="classObj"
      label-width="100px"
      :rules="rules"
    >
      <el-page-header
        @back="goBack"
        content="学院编辑"
        v-if="$route.params.flag"
      >
      </el-page-header>
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="所属学院" prop="college_id">
            <el-select
              v-model="classObj.college_id"
              placeholder="请选择"
              style="width:100%"
              @change="collegeChange"
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
        <el-col :span="8">
          <el-form-item label="所属专业" prop="specialty">
            <el-select
              v-model="classObj.specialty"
              placeholder="请选择"
              style="width:100%"
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
      </el-row>

      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="班主任" prop="teacher_id">
            <el-select
              v-model="classObj.teacher_id"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="teacher in userList"
                :key="teacher.teacher_id"
                :label="teacher.user_name"
                :value="teacher.teacher_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="班级名称" prop="class_name">
            <el-input v-model="classObj.class_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="3">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{
              $route.params.flag ? "提交" : "添加"
            }}</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { findTeacher } from "@api/user";
import { queryMajor } from "@api/college";
import { addClass, editClass } from "@api/class";
export default {
  props: [],
  mounted() {
    findTeacher().then(res => (this.userList = res));
    queryMajor().then(res => (this.collegeList = res));
    const { flag, data } = this.$route.params;
    if (flag) {
      this.classObj = {
        teacher_id: data.teacher_id,
        specialty: data.specialty,
        college_id: data.college_id,
        class_name: data.class_name,
        class_id: data.class_id
      };
    }
  },
  data() {
    return {
      classObj: {
        teacher_id: "",
        specialty: "",
        college_id: "",
        class_name: ""
      },
      userList: [],
      collegeList: [],
      majorList: [],
      rules: {
        teacher_id: {
          required: true,
          message: "请选择班主任",
          trigger: "blur"
        },
        specialty: {
          required: true,
          message: "请选择专业",
          trigger: "blur"
        },
        college_id: {
          required: true,
          message: "请选择学院",
          trigger: "blur"
        },
        class_name: {
          required: true,
          message: "请填写班级名称",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["classObj"].validate(async valid => {
        if (valid) {
          let result;
          if (this.$route.params.flag) {
            result = await editClass(this.classObj);
            console.log(111);
          } else {
            result = await addClass(this.classObj);
          }

          if (result) {
            this.classObj = {
              teacher_id: "",
              specialty: "",
              college_id: "",
              class_name: ""
            };
            this.$message({
              type: "success",
              message: this.$route.params.flag ? "编辑成功!" : "添加成功!"
            });
          }
          if (this.$route.params.flag) {
            this.goBack();
          }
        }
      });
    },
    resetForm() {
      this.$refs["classObj"].resetFields();
    },
    collegeChange(params) {
      console.log(params);
      this.majorList = this.collegeList.find(
        college => college.college_id === params
      )["majorList"];
      this.classObj.specialty = "";
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.add-major {
  width: 1200px;
  margin: 0 auto;
  border-radius: 10px;
}
.el-form {
  padding-top: 30px;
  background-color: #fff;
}
.el-page-header {
  padding: 0px 30px 50px;
}
</style>
