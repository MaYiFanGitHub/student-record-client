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
            :disabled="$store.state.userInfo.role_id === 3"
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
            :disabled="$store.state.userInfo.role_id === 3"
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
        <el-form-item label="姓名" prop="user_name">
          <el-input
            type="text"
            v-model="formInline.user_name"
            :disabled="$store.state.userInfo.role_id === 3"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="$store.state.userInfo.role_id === 3"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="user-list-footer">
      <el-table :data="jobList" stripe style="width: 100%" v-loading="loading">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="学生ID">
                <span>{{ props.row.student_id }}</span>
              </el-form-item>
              <el-form-item label="姓名">
                <span>{{ props.row.user_name }}</span>
              </el-form-item>
              <el-form-item label="所属学院">
                <span>{{ props.row.college_name }}</span>
              </el-form-item>
              <el-form-item label="专业名称">
                <span>{{ props.row.specialty_name }}</span>
              </el-form-item>
              <el-form-item label="班级名称">
                <span>{{ props.row.class_name }}</span>
              </el-form-item>
              <el-form-item label="单位名称">
                <span>{{ props.row.job_name }}</span>
              </el-form-item>
              <el-form-item label="社会信用代码">
                <span>{{ props.row.job_code }}</span>
              </el-form-item>
              <el-form-item label="单位地址">
                <span>{{ props.row.job_address }}</span>
              </el-form-item>
              <el-form-item label="单位联系人">
                <span>{{ props.row.job_person }}</span>
              </el-form-item>

              <el-form-item label="联系人电话">
                <span>{{ props.row.job_tel }}</span>
              </el-form-item>
              <el-form-item label="工作内容">
                <span>{{ props.row.job_content }}</span>
              </el-form-item>
              <el-form-item label="文件列表">
                <el-link
                  v-for="(item, index) in props.row.fileList"
                  :key="index"
                  type="primary"
                  :href="item.file_url"
                  target="_blank"
                  style="display: block;"
                  >{{
                    item.file_url.substring(item.file_url.lastIndexOf("/") + 1)
                  }}</el-link
                >
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
          prop="student_id"
          label="学生ID"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="user_name"
          label="姓名"
          align="center"
        ></el-table-column>
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
        <el-table-column
          prop="job_name"
          label="单位名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="job_code"
          label="社会信用代码"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="job_address"
          label="单位地址"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="job_person"
          label="单位联系人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="job_tel"
          label="联系人电话"
          align="center"
        ></el-table-column>
        <el-table-column label="文件列表" align="center" width="190">
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
          v-if="$store.state.userInfo.role_id === 4"
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
import { queryMajorAndClass } from "@api/major";
import { queryJob, removeJob } from "@api/job";
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

    // 判断是否为学生身份
    let userInfo = this.$store.state.userInfo;
    if (userInfo.role_id === 3) {
      this.formInline = {
        class_id: userInfo.class_id,
        specialty: userInfo.specialty,
        user_name: userInfo.user_name
      };
    }

    this.queryRoll();
  },
  data() {
    return {
      formInline: {
        class_id: "all",
        specialty: "all",
        user_name: ""
      },
      majorList: [],
      classList: [],
      jobList: [],
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
      const { class_id, specialty, user_name } = this.formInline;
      this.loading = true;
      const result = await queryJob(
        currentPage,
        pageSize,
        class_id,
        specialty,
        user_name
      );
      this.jobList = result.jobList;
      this.page = result.page;
      this.loading = false;
      console.log(this.jobList);
    },
    onSubmit() {
      this.page.currentPage = 1;
      this.queryRoll();
    },
    handleClick(row, flag) {
      if (flag) {
        // 编辑
        this.$router.push({
          name: "jobEdit",
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
            const result = await removeJob(row.job_id);
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
