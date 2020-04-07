<template>
  <div class="user-list">
    <div class="user-list-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input
            v-model="formInline.user"
            placeholder="请输入专业名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="院长">
          <el-input
            v-model="formInline.user"
            placeholder="请选择所属学院"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-list-footer">
      <el-table :data="collegeList" stripe style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="专业ID">
                <span>{{ props.row.college_id }}</span>
              </el-form-item>
              <el-form-item label="专业名称">
                <span>{{ props.row.college_name }}</span>
              </el-form-item>
              <el-form-item label="所属学院">
                <span>{{ props.row.college_name }}</span>
              </el-form-item>
              <el-form-item label="专业描述">
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
          label="专业ID"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="college_name"
          label="专业名称"
          align="center"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="college_tel"
          label="所属学院"
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
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      collegeList: [
        {
          college_id: "12345",
          college_name: "体育学院",
          college_desc: "描述描述描述描述描述描述描述描述",
          college_email: "mayifan_1@163.com",
          college_room: "北B312",
          college_tel: "13700000000",
          user_name: "张三",
          user_id: 0
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row, flag) {
      if (flag) {
        // 编辑
        this.$router.push({
          name: "majorEdit",
          params: { flag: true, data: row }
        });
      } else {
        // 删除
        this.$confirm("确定要删除此记录吗？是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    }
  },
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
