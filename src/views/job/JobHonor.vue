<template>
  <div class="user-list">
    <el-page-header
      @back="goBack"
      :content="studentInfo.user_name + '奖惩信息'"
      v-if="$route.query.student_id"
    >
    </el-page-header>
    <div class="user-list-header">
      <h1 class="title">在校奖惩信息</h1>
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
        <el-form-item label="奖惩类型">
          <el-select
            v-model="formInline.honor_type"
            placeholder="请选择"
            style="width:100%"
            size="small"
            @change="yearChange"
          >
            <el-option label="全部" value="all"></el-option>
            <el-option label="荣誉" :value="1"></el-option>
            <el-option label="处分" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table
        :data="honorList"
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
        <el-table-column label="奖惩类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.honor_type == 1 ? "荣誉" : "处分" }}
          </template>
        </el-table-column>
        <el-table-column
          label="奖惩级别"
          prop="honor_rank"
          align="center"
        ></el-table-column>
        <el-table-column
          label="奖惩名称"
          prop="honor_name"
          align="center"
        ></el-table-column>
        <el-table-column label="奖惩时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.honor_time | format }}
          </template>
        </el-table-column>
        <el-table-column label="文件列表" align="center">
          <template slot-scope="scope">
            <el-link
              v-for="(item, index) in scope.row.fileList"
              :key="index"
              type="primary"
              :href="item.file_url"
              target="_blank"
              >{{
                item.file_url.substring(item.file_url.lastIndexOf("/") + 1)
              }}</el-link
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="120"
          v-if="$store.state.userInfo.role_id !== 3"
        >
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
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { queryStudentInfo } from "@api/student";
import { queryHonor, removeHonor } from "@api/honor";
import Monent from "moment";
export default {
  async mounted() {
    // 获取用户个人信息
    let res = await queryStudentInfo(
      this.$route.query.student_id || this.$store.state.userInfo.student_id
    );
    this.studentInfo = res;

    this.queryHonor();
  },
  data() {
    return {
      formInline: {
        honor_type: "all"
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
      honorList: [],
      loading: false
    };
  },
  filters: {
    format(val) {
      if (!val) {
        return "";
      }
      return Monent(val).format("YYYY-MM-DD");
    }
  },
  methods: {
    async queryHonor() {
      const { honor_type } = this.formInline;
      let student_id;
      if (this.$route.query.student_id) {
        student_id = this.$route.query.student_id;
      } else {
        student_id = this.$store.state.userInfo.student_id;
      }
      this.loading = true;
      const result = await queryHonor(student_id, honor_type);
      console.log(result);
      this.honorList = result;
      this.loading = false;
    },
    handleClick(row, flag) {
      if (flag == 1) {
        // 编辑
        this.$router.push({
          name: "honorEdit",
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
            const result = await removeHonor(row.honor_id);
            if (result) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.queryHonor();
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
      this.queryHonor();
    },
    typeChange(params) {
      this.formInline.course_type = params;
      this.queryHonor();
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
