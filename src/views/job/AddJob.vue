<template>
  <div class="add-major">
    <el-form ref="jobObj" :model="jobObj" label-width="120px" :rules="rules">
      <el-page-header
        @back="goBack"
        content="就业信息编辑"
        v-if="$route.params.flag"
      >
      </el-page-header>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="所属学院" prop="college_id">
            <el-select
              v-model="jobObj.college_id"
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
              v-model="jobObj.student_id"
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
          <el-form-item label="单位名称" prop="job_name">
            <el-input type="text" v-model="jobObj.job_name"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="社会信用代码" prop="job_code">
            <el-input type="text" v-model="jobObj.job_code"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="单位地址" prop="job_address">
            <el-input type="text" v-model="jobObj.job_address"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="单位联系人" prop="job_person">
            <el-input type="text" v-model="jobObj.job_person"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="联系人电话" prop="job_tel">
            <el-input type="text" v-model="jobObj.job_tel"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="工作内容" prop="job_content">
            <el-input type="text" v-model="jobObj.job_content"> </el-input>
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
              :file-list="jobObj.fileList"
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
import { addJob, updateJob } from "@api/job";
import Moment from "moment";
export default {
  props: [],
  mounted() {
    this.$store.dispatch("getStudentByCollege");
    queryMajor().then(res => {
      this.collegeList = res;
      this.jobObj.college_id = this.$store.state.userInfo.college_id;
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
      this.jobObj = data;
    }
  },
  data() {
    return {
      jobObj: {
        college_id: -1,
        student_id: "",
        job_name: "",
        job_code: "",
        job_address: "",
        job_person: "",
        job_tel: "",
        job_content: "",
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
        job_name: {
          required: true,
          message: "请输入单位名称",
          trigger: "blur"
        },
        job_code: {
          required: true,
          message: "请输入社会信用代码",
          trigger: "blur"
        },
        job_address: {
          required: true,
          message: "请输入单位地址",
          trigger: "blur"
        },
        job_person: {
          required: true,
          message: "请输入单位联系人",
          trigger: "blur"
        },
        job_tel: {
          required: true,
          message: "请输入联系人电话",
          trigger: "blur"
        },
        job_content: {
          required: true,
          message: "请输入工作内容",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["jobObj"].validate(async valid => {
        if (valid) {
          let result;
          if (this.$route.params.flag) {
            result = await updateJob(this.jobObj);
            console.log(111);
          } else {
            result = await addJob(this.jobObj);
          }

          if (result) {
            this.jobObj = {
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
      this.$refs["jobObj"].resetFields();
      this.jobObj.college_id = this.$store.state.userInfo.college_id;
    },
    goBack() {
      this.$router.back();
    },
    handleRemove(file) {
      console.log(file);
      let index = this.jobObj.fileList.findIndex(
        item => file.file_id === item.file_id
      );
      this.jobObj.fileList.splice(index, 1);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onSunccess(response) {
      this.jobObj.fileList.push({
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
