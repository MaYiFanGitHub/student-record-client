<template>
  <div>
    <el-form
      ref="courseObjForm"
      :model="courseObj"
      label-width="80px"
      :rules="rules"
    >
      <el-col :span="8" :offset="2">
        <el-form-item label="课程名称" prop="course_name">
          <el-input v-model="courseObj.course_name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item label="课时" prop="course_hour">
          <el-input v-model="courseObj.course_hour"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item label="上课地点" prop="course_classroom">
          <el-input v-model="courseObj.course_classroom"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item label="学分" prop="course_credit">
          <el-input v-model="courseObj.course_credit"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item
          label="开课学年"
          prop="course_year_begin"
          class="year-ipt"
        >
          <el-col :span="11">
            <el-date-picker
              format="yyyy"
              value-format="yyyy"
              v-model="courseObj.course_year_begin"
              type="year"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="2">
            <div style="text-align:center">-</div>
          </el-col>
          <el-col :span="11">
            <el-date-picker
              format="yyyy"
              value-format="yyyy"
              v-model="courseObj.course_year_end"
              type="year"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item label="课容量" prop="course_amount">
          <el-input v-model="courseObj.course_amount"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item label="课程类型" prop="course_type">
          <el-select
            v-model="courseObj.course_type"
            placeholder="请选择课程类型"
            style="width:100%"
          >
            <el-option label="限制性选修课" value="限制性选修课"></el-option>
            <el-option
              label="非限制性选修课"
              value="非限制性选修课"
            ></el-option>
            <el-option label="公共必修课" value="公共必修课"></el-option>
            <el-option label="公共选修课" value="公共选修课"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8" :offset="2">
        <el-form-item label="考核方式" prop="course_assess">
          <el-select
            v-model="courseObj.course_assess"
            placeholder="请选择考核方式"
            style="width:100%"
          >
            <el-option label="考查" value="考查"></el-option>
            <el-option label="考试" value="考试"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item label="授课教师" prop="teahcher_id">
          <el-select
            v-model="courseObj.teahcher_id"
            placeholder="请选择民族"
            style="width:100%"
          >
            <el-option label="汉族" value="汉族"></el-option>
            <el-option label="土家族" value="土家族"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2" prop="course_info">
        <el-form-item label="课程简介">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="courseObj.course_info"
          >
          </el-input>
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
export default {
  props: ["dialogVisible", "editUserObj"],
  mounted() {
    if (this.editUserObj && this.editUserObj.role_id) {
      this.courseObj = Object.assign({}, this.editUserObj);
    }
  },
  data() {
    return {
      courseObj: {
        course_name: "",
        course_hour: "",
        course_classroom: "",
        course_credit: "",
        course_year_begin: "",
        course_year_end: "",
        course_info: "",
        course_amount: "",
        course_type: "",
        course_assess: "",
        teahcher_id: ""
      },

      rules: {
        course_name: {
          required: true,
          message: "请输入课程名称",
          trigger: "blur"
        },
        course_hour: {
          required: true,
          message: "请输入课时数",
          trigger: "blur"
        },
        course_classroom: {
          required: true,
          message: "请输入上课地点",
          trigger: "blur"
        },
        course_credit: {
          required: true,
          message: "请输入学分",
          trigger: "blur"
        },
        course_year_begin: {
          required: true,
          message: "请选择开课学年",
          trigger: "blur"
        },
        course_info: {
          required: true,
          message: "请输入课程简介",
          trigger: "blur"
        },
        course_amount: {
          required: true,
          message: "请输入课容量",
          trigger: "blur"
        },
        course_type: {
          required: true,
          message: "请选择课程类型",
          trigger: "blur"
        },
        course_assess: {
          required: true,
          message: "请选择考核方式",
          trigger: "blur"
        },
        teahcher_id: {
          required: true,
          message: "请选择授课教师",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["courseObjForm"].validate(valid => {
        if (valid) {
          alert("submit!");
          this.isSuccess = true;
          return true;
        } else {
          this.isSuccess = false;
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["courseObjForm"].resetFields();
    }
  },
  watch: {
    editUserObj() {
      this.courseObj = Object.assign({}, this.editUserObj);
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
