<template>
  <div class="user-list">
    <div class="user-list-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属专业">
          <el-select
            v-model="formInline.specialty"
            placeholder="请选择"
            style="width:100%"
            @change="majorChange"
          >
            <el-option label="全部" value="all"></el-option>
            <el-option
              v-for="major in majorList"
              :key="major.specialty"
              :label="major.specialty_name"
              :value="major.specialty"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属班级">
          <el-select
            v-model="formInline.class_id"
            placeholder="请选择"
            style="width:100%"
          >
            <el-option label="全部" value="all"></el-option>
            <el-option
              v-for="item in classList"
              :key="item.class_id"
              :label="item.class_name"
              :value="item.class_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-list-footer">
      <el-table
        :data="studentList"
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
          prop="student_id"
          label="学生ID"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="user_name"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column prop="user_sex" label="性别" align="center">
        </el-table-column>
        <el-table-column
          prop="college_name"
          label="所属学院"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="specialty_name"
          label="专业名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="class_name"
          label="班级名称"
          align="center"
        ></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleClick(scope.row)"
              icon="el-icon-view"
              circle
              size="mini"
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
import { queryStudentInfoList } from "@api/student";
import { queryMajorAndClass } from "@api/major";
export default {
  mounted() {
    queryMajorAndClass().then(res => {
      let { role_id, teacher_id } = this.$store.state.userInfo;
      let resList;
      if (role_id == 2) {
        resList = res.filter(item => {
          let tempClassList = [];
          tempClassList = item.classList.filter(cItem => {
            return cItem.teacher_id == teacher_id;
          });
          console.log(tempClassList);
          if (tempClassList.length > 0) {
            item.classList = tempClassList;
            console.log(1);
            return true;
          } else {
            console.log(2);
            return false;
          }
        });
        console.log(resList);
        this.majorList = resList;
      } else {
        this.majorList = res;
      }
    });
    this.queryRoll();
  },
  data() {
    return {
      formInline: {
        class_id: "all",
        specialty: "all"
      },
      majorList: [],
      classList: [],
      studentList: [],
      page: {
        pageSize: 10, //每页的数据条数
        currentPage: 1, // 当前页
        total: 1
      },
      loading: false
    };
  },
  methods: {
    async queryRoll() {
      const { currentPage, pageSize } = this.page;
      const { class_id, specialty } = this.formInline;
      this.loading = true;
      const result = await queryStudentInfoList(
        currentPage,
        pageSize,
        class_id,
        specialty
      );
      this.studentList = result.studentList;
      this.page = result.page;
      this.loading = false;
    },
    onSubmit() {
      this.page.currentPage = 1;
      this.queryRoll();
    },
    handleClick(row) {
      console.log(row);
      this.$router.push({
        name: "personAdd",
        params: {
          data: {
            user_id: row.user_id,
            student_id: row.student_id,
            role_id: row.role_id,
            politics_status_info_id: row.politics_status_info_id
          }
        }
      });
    },
    handleSizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.queryRoll();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.queryRoll();
    },
    majorChange(params) {
      if (params !== "all") {
        this.classList = this.majorList.find(
          major => major.specialty === params
        )["classList"];
      }
      this.formInline.class_id = "all";
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
