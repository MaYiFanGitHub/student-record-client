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
        <el-form-item label="申请状态">
          <el-select
            v-model="formInline.apply_type"
            placeholder="请选择"
            style="width:100%"
          >
            <el-option label="全部" :value="-1"></el-option>
            <el-option label="未审批" :value="1"></el-option>
            <el-option label="已审批" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-list-footer">
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
          prop="course_name"
          label="课程名称"
          align="center"
        ></el-table-column>
        <el-table-column label="异议类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.score_dissent_type == 1 ? "成绩错误" : "" }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.type_begin_time | formDate }}
          </template>
        </el-table-column>
        <el-table-column label="审批时间" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.type_end_time | formDate }}
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">
            {{ scope.row.type_stu_desc.substr(0, 15) + "..." }}
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleClick(scope.row)"
              icon="el-icon-edit"
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

    <el-dialog title="审批单" :visible.sync="dialogVisible" width="600px">
      <el-form :model="applyObj" label-width="130px">
        <el-form-item label="课程名称" prop="course_name">
          <el-input v-model="applyObj.course_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="成绩" prop="score">
          <el-input v-model="applyObj.score"></el-input>
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
import Monent from "moment";
import { getApplyScoreList, updateApplyScore } from "@api/student";
import { queryMajorAndClass } from "@api/major";
export default {
  mounted() {
    queryMajorAndClass().then(res => (this.majorList = res));
    this.queryScore();
  },
  filters: {
    formDate(val) {
      if (val) {
        return Monent(val).format("YYYY-MM-DD HH:mm:ss");
      }
      return "";
    }
  },
  data() {
    return {
      dialogVisible: false,
      applyObj: {
        course_id: "",
        student_id: "",
        course_name: "",
        type_begin_time: "",
        type_end_time: "",
        type_tea_desc: "",
        type_stu_desc: "",
        score: 0
      },
      formInline: {
        class_id: "all",
        specialty: "all",
        apply_type: -1
      },
      majorList: [],
      classList: [],
      scoreList: [],
      page: {
        pageSize: 10, //每页的数据条数
        currentPage: 1, // 当前页
        total: 1
      },
      loading: false
    };
  },
  methods: {
    async handleApply() {
      delete this.applyObj.course_name;

      this.applyObj.type_end_time = Monent(new Date()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      console.log(this.applyObj);
      let res = await updateApplyScore(this.applyObj);
      if (res) {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        this.queryScore();
      }

      this.dialogVisible = false;
    },
    async queryScore() {
      const { currentPage, pageSize } = this.page;
      const { class_id, specialty, apply_type } = this.formInline;
      this.loading = true;
      const result = await getApplyScoreList(
        currentPage,
        pageSize,
        class_id,
        specialty,
        apply_type
      );
      this.scoreList = result.scoreList;
      this.page = result.page;
      this.loading = false;
    },
    onSubmit() {
      this.page.currentPage = 1;
      this.queryScore();
    },
    handleClick(row) {
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
    },
    handleSizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.queryScore();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.queryScore();
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
