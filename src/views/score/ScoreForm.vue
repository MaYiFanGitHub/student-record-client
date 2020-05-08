<template>
  <div class="course-form-box">
    <el-form
      ref="scoreObjForm"
      :model="scoreObj"
      label-width="80px"
      :rules="rules"
    >
      <el-page-header
        @back="goBack"
        content="成绩编辑"
        v-if="$route.params.flag"
      >
      </el-page-header>
      <el-col :span="8" :offset="2">
        <el-form-item label="课程名称" prop="course_id">
          <el-select
            v-model="scoreObj.course_id"
            placeholder="请选择课程"
            style="width:100%"
            :disabled="this.$route.params.flag"
          >
            <el-option
              v-for="course in $store.state.courseListByCollege"
              :key="course.course_id"
              :label="course.course_name"
              :value="course.course_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item label="学生姓名" prop="student_id">
          <el-select
            v-model="scoreObj.student_id"
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
      <el-col :span="8" :offset="2" prop="score">
        <el-form-item label="成绩" prop="score">
          <el-input v-model.number="scoreObj.score"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item label="成绩类型">
          <el-select
            v-model="scoreObj.score_type"
            placeholder="请选择成绩类型"
            style="width:100%"
          >
            <el-option label="正常" value="正常" selected></el-option>
            <el-option label="以证代修" value="以证代修"></el-option>
            <el-option label="免考" value="免考"></el-option>
            <el-option label="缓考" value="缓考"></el-option>
            <el-option label="重修" value="重修"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8" :offset="2">
        <el-form-item label="成绩备注">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="scoreObj.score_desc"
          >
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="21" :offset="2">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{
            $route.params.flag ? "提交" : "添加"
          }}</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import { addStudentScore, updateStudentScore } from "@api/student";

export default {
  mounted() {
    const { flag, data } = this.$route.params;

    if (flag) {
      data.course_year_begin = data.course_year.split("-")[0];
      data.course_year_end = data.course_year.split("-")[1];
      this.scoreObj = data;
      this.$set(this, "scoreObj", data);
    }
  },
  data() {
    return {
      scoreObj: {
        course_id: "",
        student_id: "",
        score: "",
        score_desc: "",
        score_type: "正常"
      },

      rules: {
        course_id: {
          required: true,
          message: "请选择课程名称",
          trigger: "blur"
        },
        student_id: {
          required: true,
          message: "请选择学生名称",
          trigger: "blur"
        },
        score: {
          required: true,
          message: "请输入成绩",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["scoreObjForm"].validate(async valid => {
        if (valid) {
          let result;
          if (this.$route.params.flag) {
            result = await updateStudentScore(this.scoreObj);
            console.log(this.scoreObj);
          } else {
            result = await addStudentScore([this.scoreObj]);
          }

          if (result) {
            this.scoreObj = {};
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
      this.$refs["scoreObjForm"].resetFields();
    },
    goBack() {
      this.$router.back();
    },
    forceUpdate1(val) {
      this.$set(this.scoreObj, "course_year_begin", val);
    },
    forceUpdate2(val) {
      this.$set(this.scoreObj, "course_year_end", val);
    }
  },
  watch: {
    editUserObj() {
      this.scoreObj = Object.assign({}, this.editUserObj);
    }
  }
};
</script>

<style lang="scss" scoped>
.course-form-box {
  background-color: #fff;
}
.el-form {
  padding-top: 30px;
  background-color: #fff;
  .year-ipt {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100% !important;
    }
  }
}
.el-page-header {
  padding: 0px 30px 50px;
}
</style>
