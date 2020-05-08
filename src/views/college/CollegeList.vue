<template>
  <div class="user-list">
    <div class="user-list-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学院名称">
          <el-input
            v-model="formInline.college_name"
            placeholder="请输入学院名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="院长">
          <el-input
            v-model="formInline.user_name"
            placeholder="请输入院长名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-list-footer">
      <el-table
        :data="collegeList"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="学院Id">
                <span>{{ props.row.college_id }}</span>
              </el-form-item>
              <el-form-item label="学院名称">
                <span>{{ props.row.college_name }}</span>
              </el-form-item>
              <el-form-item label="院长">
                <span>{{ props.row.user_name }}</span>
              </el-form-item>
              <el-form-item label="学院电话">
                <span>{{ props.row.college_tel }}</span>
              </el-form-item>
              <el-form-item label="学院邮箱">
                <span>{{ props.row.college_email }}</span>
              </el-form-item>
              <el-form-item label="学院办公室">
                <span>{{ props.row.college_room }}</span>
              </el-form-item>
              <el-form-item label="学院描述">
                <span>{{ props.row.college_desc }}</span>
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
          prop="college_id"
          label="学院ID"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="college_name"
          label="学院名称"
          align="center"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="院长"
          align="center"
          min-width="80"
        ></el-table-column>
        <el-table-column
          prop="college_tel"
          label="学院电话"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="college_room"
          label="学院办公室"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="college_email"
          label="学院邮箱"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="120"
          v-if="$store.state.userInfo.role_id === 0"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleClick(scope.row, true)"
              icon="el-icon-edit"
              circle
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              @click="handleClick(scope.row, false)"
              icon="el-icon-delete"
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
import { getAllCollege, removeCollege } from "@api/college.js";
export default {
  mounted() {
    this.queryCollege();
  },
  data() {
    return {
      formInline: {
        college_name: "",
        user_name: ""
      },
      collegeList: [],
      page: {
        pageSize: 10, //每页的数据条数
        currentPage: 1, // 当前页
        total: 1
      },
      loading: false
    };
  },
  methods: {
    async queryCollege() {
      const { currentPage, pageSize } = this.page;
      const { college_name, user_name } = this.formInline;
      this.loading = true;
      const result = await getAllCollege(
        currentPage,
        pageSize,
        college_name,
        user_name
      );
      this.collegeList = result.collegeList;
      this.page = result.page;
      this.loading = false;
    },
    onSubmit() {
      this.page.currentPage = 1;
      this.queryCollege();
    },
    handleClick(row, flag) {
      if (flag) {
        // 编辑
        this.$router.push({
          name: "collegeEdit",
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
            const result = await removeCollege(row.college_id);
            if (result) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.page.currentPage = 1;
              this.queryCollege();
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
      this.queryCollege();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.queryCollege();
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
