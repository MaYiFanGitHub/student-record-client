<template>
  <div class="user-list">
    <div class="user-list-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属学院">
          <el-select
            v-model="formInline.college_id"
            placeholder="请选择"
            style="width:100%"
          >
            <el-option label="全部" value="all"></el-option>
            <el-option
              v-for="college in collegeList"
              :key="college.college_id"
              :label="college.college_name"
              :value="college.college_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开课学年">
          <el-select
            v-model="formInline.course_year"
            placeholder="请选择"
            style="width:100%"
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
        <el-form-item label="考核方式">
          <el-select
            v-model="formInline.course_assess"
            placeholder="请选择考核方式"
            style="width:100%"
          >
            <el-option label="全部" value="all"></el-option>
            <el-option label="考查" value="考查"></el-option>
            <el-option label="考试" value="考试"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input
            v-model="formInline.course_name"
            placeholder="请输入课程名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="授课教师">
          <el-input
            v-model="formInline.user_name"
            placeholder="请输入授课教师"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-list-footer">
      <el-table
        :data="courseList"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="课程ID">
                <span>{{ props.row.course_id }}</span>
              </el-form-item>
              <el-form-item label="课程名称">
                <span>{{ props.row.course_name }}</span>
              </el-form-item>
              <el-form-item label="所属学院">
                <span>{{ props.row.college_name }}</span>
              </el-form-item>
              <el-form-item label="授课教师">
                <span>{{ props.row.user_name }}</span>
              </el-form-item>
              <el-form-item label="课时">
                <span>{{ props.row.course_hour }}</span>
              </el-form-item>
              <el-form-item label="上课地点">
                <span>{{ props.row.course_classroom }}</span>
              </el-form-item>
              <el-form-item label="学分">
                <span>{{ props.row.course_credit }}</span>
              </el-form-item>
              <el-form-item label="开课学年">
                <span>{{ props.row.course_year }}</span>
              </el-form-item>
              <el-form-item label="课容量">
                <span>{{ props.row.course_amount }}</span>
              </el-form-item>
              <el-form-item label="课程类型">
                <span>{{ props.row.course_type }}</span>
              </el-form-item>
              <el-form-item label="考核方式">
                <span>{{ props.row.course_assess }}</span>
              </el-form-item>

              <el-form-item label="课程简介">
                <span>{{ props.row.course_info }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          width="50"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="course_id"
          label="课程ID"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
          align="center"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="college_name"
          label="所属学院"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="user_name"
          label="授课教师"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="course_hour"
          label="课时"
          align="center"
          min-width="80"
        ></el-table-column>
        <el-table-column
          prop="course_classroom"
          label="上课地点"
          align="center"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="course_credit"
          label="学分"
          align="center"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="course_year"
          label="开课学年"
          align="center"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="course_amount"
          label="课容量"
          align="center"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="course_type"
          label="课程类型"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="course_assess"
          label="考核方式"
          align="center"
          min-width="150"
        ></el-table-column>

        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="120"
          v-if="$store.state.userInfo.role_id != 3"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleClick(scope.row, true)"
              icon="el-icon-edit"
              circle
              size="mini"
              :disabled="
                $store.state.userInfo.college_id !== scope.row.college_id
              "
            ></el-button>
            <el-button
              type="danger"
              @click="handleClick(scope.row, false)"
              icon="el-icon-delete"
              circle
              size="mini"
              :disabled="
                $store.state.userInfo.college_id !== scope.row.college_id
              "
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next, sizes"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="page.pageSize"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getCollegeSelect } from "@api/college";
import { getAllCourse, queryCourseYear, removeCourse } from "@api/course";
export default {
  mounted() {
    getCollegeSelect().then(res => (this.collegeList = res));
    queryCourseYear().then(res => {
      this.courseYearList = res;
    });
    this.queryCourse();
  },
  data() {
    return {
      formInline: {
        college_id: "all",
        course_year: "all",
        course_type: "all",
        course_assess: "all",
        course_name: "",
        user_name: ""
      },
      collegeList: [],
      courseList: [],
      courseYearList: [],
      page: {
        pageSize: 10, //每页的数据条数
        currentPage: 1, // 当前页
        total: 1
      },
      loading: false
    };
  },
  methods: {
    async queryCourse() {
      const { currentPage, pageSize } = this.page;
      const {
        college_id,
        course_year,
        course_type,
        course_assess,
        course_name,
        user_name
      } = this.formInline;
      this.loading = true;
      const result = await getAllCourse(
        currentPage,
        pageSize,
        college_id,
        course_year,
        course_type,
        course_assess,
        course_name,
        user_name
      );
      this.courseList = result.courseList;
      this.page = result.page;
      this.loading = false;
    },
    onSubmit() {
      this.page.currentPage = 1;
      this.queryCourse();
    },
    handleClick(row, flag) {
      if (flag) {
        // 编辑
        this.$router.push({
          name: "courseEdit",
          params: { flag: true, data: row }
        });
      } else {
        // 删除
        this.$confirm("确定要删除此记录吗？是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            const result = await removeCourse(row.course_id);
            if (result) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.page.currentPage = 1;
              this.queryCourse();
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    handleSizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.queryCourse();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.queryCourse();
    }
  },
  computed: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.user-list {
  min-height: 100%;
  > .user-list-header,
  .user-list-footer {
    padding: 0 20px 20px;
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
