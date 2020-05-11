<template>
  <div class="user-list">
    <el-page-header
      @back="goBack"
      :content="studentInfo.user_name + '的学籍异动'"
      v-if="$route.query.student_id"
    >
    </el-page-header>
    <div class="user-list-header">
      <h1 class="title">个人学籍异动</h1>
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
        <el-form-item label="审批状态">
          <el-select
            v-model="formInline.state"
            placeholder="请选择"
            style="width:100%"
            size="small"
            @change="yearChange"
          >
            <el-option label="全部" value="all"></el-option>
            <el-option label="已审批" :value="0"></el-option>
            <el-option label="未审批" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table :data="rollList" stripe style="width: 100%" v-loading="loading">
        <el-table-column
          label="学籍异动ID"
          prop="roll_id"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          label="课程学籍异动类型"
          prop="roll_type"
          align="center"
        ></el-table-column>
        <el-table-column
          label="学生描述"
          prop="roll_desc"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column label="申请状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.roll_end_time">已审批</el-tag>
            <el-tag type="success" v-else>待审批</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.roll_begin_time | format }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.roll_end_time | format }}
          </template>
        </el-table-column>
        <el-table-column
          label="审批人"
          prop="roll_auditor"
          align="center"
        ></el-table-column>
        <el-table-column
          label="审批内容"
          prop="roll_audit"
          align="center"
          width="150"
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
              :disabled="!scope.row.roll_end_time"
            ></el-button>
            <el-button
              type="danger"
              @click="handleClick(scope.row, 3)"
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
              :disabled="!!scope.row.roll_end_time"
            >
              取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="500px">
      <el-form :model="rollObj" label-width="130px">
        <el-form-item label="学生ID" prop="student_id">
          <el-input v-model="rollObj.student_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="user_name">
          <el-input v-model="rollObj.user_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="学籍异动类型" prop="roll_type">
          <el-select
            v-model="rollObj.roll_type"
            placeholder="请选择类型"
            style="width:100%"
            disabled
          >
            <el-option label="休学" value="休学"></el-option>
            <el-option label="复学" value="复学"></el-option>
            <el-option label="退学" value="退学"></el-option>
            <el-option label="留级" value="留级"></el-option>
            <el-option label="当兵入伍" value="当兵入伍"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-col :span="24">
          <el-form-item label="创建时间">
            {{ rollObj.roll_begin_time | format }}
          </el-form-item>
        </el-col>
        <el-form-item label="学生的描述">
          <el-input
            type="textarea"
            v-model="rollObj.roll_desc"
            :disabled="$store.state.userInfo.role_id === 4"
          ></el-input>
        </el-form-item>

        <el-form-item label="老师的描述">
          <el-input
            type="textarea"
            v-model="rollObj.roll_audit"
            :disabled="$store.state.userInfo.role_id === 3"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryStudentInfo, updateApplyScore } from "@api/student";
import { queryPersonRoll, removeRoll, updateRoll } from "@api/roll";
import Monent from "moment";
export default {
  async mounted() {
    // 获取用户个人信息
    let res = await queryStudentInfo(
      this.$route.query.student_id || this.$store.state.userInfo.student_id
    );
    this.studentInfo = res;

    this.queryPersonRoll();
  },
  filters: {
    format(val) {
      if (!val) {
        return "";
      }
      return Monent(val).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  data() {
    return {
      formInline: {
        state: "all"
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
      studentInfo: {},
      courseYearList: [],
      rollList: [],
      dialogVisible: false,
      loading: false,
      rollObj: {}
    };
  },
  methods: {
    async queryPersonRoll() {
      const { state } = this.formInline;
      let student_id;
      if (this.$route.query.student_id) {
        student_id = this.$route.query.student_id;
      } else {
        student_id = this.$store.state.userInfo.student_id;
      }
      this.loading = true;
      const result = await queryPersonRoll(student_id, state);
      this.rollList = result;
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
        this.dialogVisible = true;
        this.rollObj = {
          roll_id: row.roll_id,
          student_id: this.$route.query.student_id,
          user_name: this.$route.query.user_name,
          roll_type: row.roll_type,
          roll_begin_time: row.roll_begin_time,
          roll_desc: row.roll_desc,
          roll_audit: row.roll_audit,
          roll_auditor: row.roll_auditor
        };
      } else if (flag === 3) {
        this.$confirm("此操作将取消你的申请, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            let res = await removeRoll(row.roll_id);
            if (res) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.queryPersonRoll();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    yearChange(params) {
      this.formInline.state = params;
      this.queryPersonRoll();
    },
    goBack() {
      this.$router.back();
    },
    async submit() {
      this.dialogVisible = false;
      this.rollObj.roll_end_time = Monent(Date.now()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      console.log(this.rollObj);
      let res = await updateRoll(this.rollObj);
      if (res) {
        this.$message({
          type: "success",
          message: "审批成功!"
        });
        this.queryPersonRoll();
      }
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
