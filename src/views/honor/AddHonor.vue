<template>
  <div class="add-major">
    <el-form
      ref="honorObj"
      :model="honorObj"
      label-width="120px"
      :rules="rules"
    >
      <el-page-header
        @back="goBack"
        content="奖惩信息编辑"
        v-if="$route.params.flag"
      >
      </el-page-header>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="所属学院" prop="college_id">
            <el-select
              v-model="honorObj.college_id"
              placeholder="请选择"
              style="width:100%"
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
        <el-col :span="8" :offset="2">
          <el-form-item label="学生姓名" prop="student_id">
            <el-select
              v-model="honorObj.student_id"
              placeholder="请选择学生"
              style="width:100%"
              :disabled="this.$route.params.flag"
            >
              <el-option
                v-for="student in $store.state.studentListByCollege"
                :key="student.student_id"
                :label="student.user_name"
                :value="student.student_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-form-item label="奖惩类型" prop="honor_type">
            <el-select
              v-model="honorObj.honor_type"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option label="荣誉" :value="0"></el-option>
              <el-option label="处分" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="奖惩级别" prop="honor_rank">
            <el-select
              v-model="honorObj.honor_rank"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option label="国家级" value="国家级"></el-option>
              <el-option label="省级" value="省级"></el-option>
              <el-option label="市级" value="市级"></el-option>
              <el-option label="校级" value="校级"></el-option>
              <el-option label="院级" value="院级"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="奖惩名称" prop="honor_name">
            <el-input type="text" v-model="honorObj.honor_name"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="时间" prop="honor_time">
            <el-date-picker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="honorObj.honor_time"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="上传文件" prop="fileList">
            <el-upload
              class="upload-demo"
              action="//localhost:3000/api/student/uploadFile"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="onSunccess"
              multiple
              :file-list="honorObj.fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :span="10" :offset="7" style="margin-top: 60px;">
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
import { queryMajor } from "@api/college";
import { addHonor, updateHonor } from "@api/honor";
import Moment from "moment";
// import { addClass, editClass } from "@api/class";
export default {
  props: [],
  mounted() {
    this.$store.dispatch("getStudentByCollege");
    queryMajor().then(res => {
      this.collegeList = res;
      this.honorObj.college_id = this.$store.state.userInfo.college_id;
    });
    const { flag, data } = this.$route.params;
    if (flag) {
      data.fileList.forEach(
        item =>
          (item.name = item.file_url.substring(
            item.file_url.lastIndexOf("/") + 1
          ))
      );
      data.honor_time = Moment(data.honor_time).format("YYYY-MM-DD");
      this.honorObj = data;
    }
  },
  data() {
    return {
      honorObj: {
        college_id: -1,
        student_id: "",
        honor_type: "",
        honor_time: "",
        honor_name: "",
        honor_rank: "",
        fileList: []
      },
      userList: [],
      collegeList: [],
      majorList: [],
      rules: {
        student_id: {
          required: true,
          message: "请选择学生",
          trigger: "blur"
        },
        honor_type: {
          required: true,
          message: "请选择奖惩类型",
          trigger: "blur"
        },
        honor_time: {
          required: true,
          message: "请选择奖惩时间",
          trigger: "blur"
        },
        honor_name: {
          required: true,
          message: "请输入奖惩名称",
          trigger: "blur"
        },
        honor_rank: {
          required: true,
          message: "请选择奖惩级别",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["honorObj"].validate(async valid => {
        if (valid) {
          let result;
          if (this.$route.params.flag) {
            result = await updateHonor(this.honorObj);
            console.log(111);
          } else {
            result = await addHonor(this.honorObj);
          }

          if (result) {
            this.honorObj = {
              college_id: this.$store.state.userInfo.college_id,
              fileList: []
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
      this.$refs["honorObj"].resetFields();
      this.honorObj.college_id = this.$store.state.userInfo.college_id;
    },
    goBack() {
      this.$router.back();
    },
    handleRemove(file) {
      console.log(file);
      let index = this.honorObj.fileList.findIndex(
        item => file.file_id === item.file_id
      );
      this.honorObj.fileList.splice(index, 1);
    },
    handlePreview(file) {
      console.log(file);
      let linkDOM = document.getElementById("golbalDownload");
      linkDOM.href = file.url || file.file_url;
      linkDOM.click();
    },
    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onSunccess(response) {
      this.honorObj.fileList.push({
        url: response.url,
        file_id: response.file_id,
        name: response.name
      });
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
  padding-bottom: 100px;
}
.el-page-header {
  padding: 0px 30px 50px;
}
</style>
