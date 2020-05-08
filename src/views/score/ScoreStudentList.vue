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
              :type="
                scope.row.type_end_time
                  ? 'success'
                  : scope.row.type_begin_time
                  ? 'warning'
                  : 'primary'
              "
              @click="handleClick(scope.row, 3)"
              size="mini"
              v-if="$store.state.userInfo.role_id === 3"
            >
              {{
                scope.row.type_end_time
                  ? "已审批"
                  : scope.row.type_begin_time
                  ? "申请中"
                  : "申请"
              }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="申请" :visible.sync="dialogVisible" width="600px">
      <el-form
        ref="classObj"
        :model="classObj"
        label-width="130px"
        :rules="rules"
      >
        <el-form-item label="课程名称" prop="course_name">
          <el-input v-model="applyObj.course_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="成绩异议类型" prop="score_dissent_type">
          <el-select
            v-model="applyObj.score_dissent_type"
            placeholder="请选择类型"
            style="width:100%"
          >
            <el-option label="成绩错误" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-col :span="12">
          <el-form-item label="创建时间">
            {{ applyObj.type_begin_time }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关闭时间">
            {{ applyObj.type_end_time }}
          </el-form-item>
        </el-col>

        <el-form-item label="老师的描述">
          <el-input
            type="textarea"
            v-model="applyObj.type_tea_desc"
            :disabled="$store.state.userInfo.role_id === 3"
          ></el-input>
        </el-form-item>

        <el-form-item label="学生的描述">
          <el-input
            type="textarea"
            v-model="applyObj.type_stu_desc"
            :disabled="$store.state.userInfo.role_id === 4"
          ></el-input>
        </el-form-item>
        <!-- </el-col> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleApply">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryStudentPersonScore,
  queryStudentInfo,
  deleteStudentScore,
  updateApplyScore
} from "@api/student";
import { queryCourseYear } from "@api/course";
import Monent from "moment";
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
      classObj: {
        teacher_id: "",
        specialty: "",
        college_id: "",
        class_name: ""
      },
      applyObj: {
        course_id: "",
        student_id: "",
        course_name: "",
        type_begin_time: "",
        type_end_time: "",
        type_tea_desc: "",
        type_stu_desc: ""
      },
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
      },
      studentInfo: {},
      courseYearList: [],
      scoreList: [],
      loading: false,
      dialogVisible: false
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
    async handleApply() {
      delete this.applyObj.course_name;
      if (!this.applyObj.type_begin_time) {
        this.applyObj.type_begin_time = Monent(new Date()).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        let res = await updateApplyScore(this.applyObj);
        if (res) {
          this.$message({
            type: "success",
            message: "申请成功!"
          });
          this.queryStudentScore();
        }
      } else if (this.applyObj.type_end_time) {
        this.applyObj.type_begin_time = Monent(new Date()).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        // 置空
        this.applyObj.type_end_time = "";
        this.applyObj.type_tea_desc = "";

        let res = await updateApplyScore(this.applyObj);
        if (res) {
          this.$message({
            type: "success",
            message: "申请成功!"
          });
          this.queryStudentScore();
        }
      }
      this.dialogVisible = false;
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
        this.dialogVisible = true;

        this.applyObj = {
          course_id: row.course_id,
          student_id: row.student_id,
          course_name: row.course_name,
          type_begin_time: row.type_begin_time
            ? Monent(row.type_begin_time).format("YYYY-MM-DD HH:mm:ss")
            : "",
          type_end_time: row.type_end_time
            ? Monent(row.type_end_time).format("YYYY-MM-DD HH:mm:ss")
            : "",
          type_tea_desc: row.type_tea_desc,
          type_stu_desc: row.type_stu_desc,
          score_dissent_type: row.score_dissent_type,
          score: row.score
        };
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
