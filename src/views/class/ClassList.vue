<template>
  <div class="user-list">
    <div class="user-list-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属学院">
          <el-select
            v-model="formInline.college_id"
            placeholder="请选择"
            style="width:100%"
            @change="collegeChange"
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
        <el-form-item label="所属专业">
          <el-select
            v-model="formInline.specialty"
            placeholder="请选择"
            style="width:100%"
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
        <el-form-item label="班级名称">
          <el-input
            v-model="formInline.class_name"
            placeholder="请输入班级名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-list-footer">
      <el-table
        :data="classList"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="班级ID">
                <span>{{ props.row.class_id }}</span>
              </el-form-item>
              <el-form-item label="所属学院">
                <span>{{ props.row.college_name }}</span>
              </el-form-item>
              <el-form-item label="所属专业">
                <span>{{ props.row.specialty_name }}</span>
              </el-form-item>
              <el-form-item label="班级名称">
                <span>{{ props.row.class_name }}</span>
              </el-form-item>
              <el-form-item label="班主任">
                <span>{{ props.row.user_name }}</span>
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
          prop="class_id"
          label="班级ID"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="college_name"
          label="所属学院"
          align="center"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="specialty_name"
          label="所属专业"
          align="center"
          min-width="80"
        ></el-table-column>
        <el-table-column
          prop="class_name"
          label="班级名称"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="user_name"
          label="班主任"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleClick(scope.row, true)"
              icon="el-icon-edit"
              circle
              size="mini"
              :disabled="
                scope.row.college_id !== $store.state.userInfo.college_id
              "
            ></el-button>
            <el-button
              type="danger"
              @click="handleClick(scope.row, false)"
              icon="el-icon-delete"
              circle
              size="mini"
              :disabled="
                scope.row.college_id !== $store.state.userInfo.college_id
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
import { queryMajor } from "@api/college";
import { getAllClass, removeClass } from "@api/class";
export default {
  mounted() {
    queryMajor().then(res => (this.collegeList = res));
    this.queryClass();
  },
  data() {
    return {
      formInline: {
        college_id: "all",
        class_name: "",
        specialty: "all"
      },
      collegeList: [],
      majorList: [],
      classList: [],
      page: {
        pageSize: 10, //每页的数据条数
        currentPage: 1, // 当前页
        total: 1
      },
      loading: false
    };
  },
  methods: {
    async queryClass() {
      const { currentPage, pageSize } = this.page;
      const { college_id, class_name, specialty } = this.formInline;
      this.loading = true;
      const result = await getAllClass(
        currentPage,
        pageSize,
        college_id,
        class_name,
        specialty
      );
      this.classList = result.classList;
      this.page = result.page;
      this.loading = false;
    },
    onSubmit() {
      this.page.currentPage = 1;
      this.queryClass();
    },
    handleClick(row, flag) {
      if (flag) {
        // 编辑
        this.$router.push({
          name: "classEdit",
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
            const result = await removeClass(row.class_id);
            if (result) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.page.currentPage = 1;
              this.queryClass();
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
      this.queryClass();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.queryClass();
    },
    collegeChange(params) {
      console.log(params);
      this.majorList = this.collegeList.find(
        college => college.college_id === params
      )["majorList"];
      this.formInline.specialty = "all";
    }
  },
  computed: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.user-list {
  width: 1200px;
  margin: 0 auto;
  min-height: 100%;
  > .user-list-header,
  .user-list-footer {
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: #fff;
    .el-form-item {
      margin-bottom: 0px;
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
