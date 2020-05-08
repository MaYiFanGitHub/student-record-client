<template>
  <div class="user-list">
    <el-page-header
      @back="goBack"
      :content="studentInfo.user_name + '个人成绩'"
      v-if="$route.query.student_id"
    >
    </el-page-header>
    <div class="user-list-header">
      <h1 class="title">在校学习成绩</h1>
      <div class="title-content">
        <el-row>
          <el-col :span="4" :offset="3"
            ><span>学生ID：</span>{{ studentInfo.student_id }}</el-col
          >
          <el-col :span="4" :offset="3"
            ><span>姓名：</span>{{ studentInfo.user_name }}</el-col
          >
          <el-col :span="4" :offset="3"
            ><span>学院：</span>{{ studentInfo.college_name }}</el-col
          >
          <el-col :span="4" :offset="3"
            ><span>专业：</span>{{ studentInfo.specialty_name }}</el-col
          >
          <el-col :span="4" :offset="3"
            ><span>班级：</span>{{ studentInfo.class_name }}</el-col
          >
        </el-row>
      </div>
    </div>
    <div class="user-list-footer">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="开课学年">
          <el-select
            v-model="formInline.course_year"
            placeholder="请选择"
            style="width:100%"
            size="small"
            @change="yearChange"
          >
            <el-option label="全部" value="all"></el-option>
            <el-option
              v-for="course in courseYearList"
              :key="course.course_year"
              :label="course.course_year"
              :value="course.course_year"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程类型">
          <el-select
            v-model="formInline.course_type"
            placeholder="请选择课程类型"
            style="width:100%"
            size="small"
            @change="typeChange"
          >
            <el-option label="全部" value="all"></el-option>
            <el-option label="限制性选修课" value="限制性选修课"></el-option>
            <el-option
              label="非限制性选修课"
              value="非限制性选修课"
            ></el-option>
            <el-option label="公共必修课" value="公共必修课"></el-option>
            <el-option label="公共选修课" value="公共选修课"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table
        :data="scoreList"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          label="序号"
          width="50"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column
          label="学年"
          prop="course_year"
          align="center"
        ></el-table-column>
        <el-table-column
          label="课程ID"
          prop="course_id"
          align="center"
        ></el-table-column>
        <el-table-column
          label="课程名称"
          prop="course_name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="课程类型"
          prop="course_type"
          align="center"
        ></el-table-column>
        <el-table-column
          label="学分"
          prop="course_credit"
          align="center"
        ></el-table-column>
        <el-table-column label="绩点" align="center">
          <template slot-scope="scope">
            {{
              scope.row.score > 90
                ? 4
                : scope.row.score > 80
                ? 3
                : scope.row.score > 70
                ? 2
                : scope.row.score > 60
                ? 1
                : 0
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="成绩"
          prop="score"
          align="center"
        ></el-table-column>
        <el-table-column
          label="备注"
          prop="score_desc"
          align="center"
        ></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleClick(scope.row, 1)"
              icon="el-icon-edit"
              circle
              size="mini"
              v-if="$store.state.userInfo.role_id === 4"
            ></el-button>
            <el-button
              type="danger"
              @click="handleClick(scope.row, 2)"
              icon="el-icon-delete"
              circle
              size="mini"
              v-if="$store.state.userInfo.role_id === 4"
            ></el-button>
            <el-button
              type="primary"
              @click="handleClick(scope.row, 3)"
              size="mini"
              v-if="$store.state.userInfo.role_id === 3"
            >
              申请
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  queryStudentPersonScore,
  queryStudentInfo,
  deleteStudentScore
} from "@api/student";
import { queryCourseYear } from "@api/course";
export default {
  async mounted() {
    // 获取用户个人信息
    let res = await queryStudentInfo(
      this.$route.query.student_id || this.$store.state.userInfo.student_id
    );
    this.studentInfo = res;

    queryCourseYear().then(res => {
      this.courseYearList = res;
    });

    this.queryStudentScore();
  },
  data() {
    return {
      formInline: {
        course_year: "all",
        course_type: "all"
      },
      studentInfo: {},
      courseYearList: [],
      scoreList: [],
      loading: false
    };
  },
  methods: {
    async queryStudentScore() {
      const { course_year, course_type } = this.formInline;
      let student_id;
      if (this.$route.query.student_id) {
        student_id = this.$route.query.student_id;
      } else {
        student_id = this.$store.state.userInfo.student_id;
      }
      this.loading = true;
      const result = await queryStudentPersonScore(
        course_year,
        course_type,
        student_id
      );
      this.scoreList = result;
      this.loading = false;
    },
    handleClick(row, flag) {
      if (flag == 1) {
        // 编辑
        this.$router.push({
          name: "scoreEdit",
          params: { flag: true, data: row }
        });
      } else if (flag == 2) {
        // 删除
        this.$confirm("确定要删除此记录吗？是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            const result = await deleteStudentScore(
              row.student_id,
              row.course_id
            );
            if (result) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.queryStudentScore();
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else if (flag === 3) {
        console.log(1);
      }
    },
    yearChange(params) {
      this.formInline.course_year = params;
      this.queryStudentScore();
    },
    typeChange(params) {
      this.formInline.course_type = params;
      this.queryStudentScore();
    },
    goBack() {
      this.$router.back();
    }
  },
  computed: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.user-list {
  min-height: 100%;
  .el-page-header {
    background-color: #fff;
    padding: 30px;
    margin-bottom: 20px;
  }
  > .user-list-header,
  .user-list-footer {
    padding: 20px 20px 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: #fff;
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .user-list-header {
    .el-form-item {
      margin-top: 20px;
    }
    h1.title {
      text-align: center;
      line-height: 48px;
      font-size: 16px;
    }
    .title-content {
      span {
        font-weight: bold;
      }
      .el-row {
        div {
          line-height: 36px;
        }
      }
    }
  }
  .el-pagination {
    text-align: right;
    margin-top: 15px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
