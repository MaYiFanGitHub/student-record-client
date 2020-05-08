<template>
  <div class="user-add">
    <el-tabs v-model="activeName">
      <el-tab-pane label="添加单个成绩" name="first">
        <ScoreForm></ScoreForm>
      </el-tab-pane>
      <el-tab-pane label="批量导入成绩" name="second" lazy>
        <div class="user-add-header cl">
          <el-upload
            :disabled="false"
            action="customize"
            name="openFile"
            :http-request="uploadFile"
            :file-list="file"
            :show-file-list="false"
            class="fr"
          >
            <el-button type="primary" class="fr" icon="el-icon-bottom-right"
              >导入成绩</el-button
            >
          </el-upload>
          <el-button type="text" class="fr">下载导入模板</el-button>
        </div>
        <div class="user-add-content">
          <div>
            <el-button type="text" class="fl all" @click="allDelete"
              >批量删除</el-button
            >
          </div>
          <el-table
            ref="multipleTable"
            :data="scoreList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column
              label="序号"
              width="50"
              type="index"
            ></el-table-column>
            <el-table-column label="课程名称" min-width="170" align="center">
              <template slot-scope="scope"
                ><el-select
                  v-model="scope.row.course_id"
                  placeholder="请选择课程"
                  style="width:100%"
                >
                  <el-option
                    v-for="course in $store.state.courseListByCollege"
                    :key="course.course_id"
                    :label="course.course_name"
                    :value="course.course_id"
                  ></el-option> </el-select
              ></template>
            </el-table-column>
            <el-table-column label="学生姓名" min-width="170" align="center">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.student_id"
                  placeholder="请选择学生"
                  style="width:100%"
                >
                  <el-option
                    v-for="student in $store.state.studentListByCollege"
                    :key="student.student_id"
                    :label="student.user_name"
                    :value="student.student_id"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="成绩" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input v-model.number="scope.row.score"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="成绩类型" min-width="170" align="center">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.score_type"
                  placeholder="请选择成绩类型"
                  style="width:100%"
                >
                  <el-option label="正常" value="正常" selected></el-option>
                  <el-option label="以证代修" value="以证代修"></el-option>
                  <el-option label="免考" value="免考"></el-option>
                  <el-option label="缓考" value="缓考"></el-option>
                  <el-option label="重修" value="重修"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="成绩备注" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="scope.row.score_desc"
                >
                </el-input>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  circle
                  @click="addOrRemove(scope, true)"
                ></el-button>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  circle
                  @click="addOrRemove(scope, false)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="user-add-footer">
          <el-button type="primary" @click="submit">提交</el-button>
          &nbsp;&nbsp;
          <el-button @click="resetClick">重置</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ScoreForm from "./ScoreForm.vue";
import { addStudentScore } from "@api/student";
import XLSX from "xlsx";
export default {
  mounted() {
    this.$store.state.courseListByCollege.forEach(item => {
      let key = item.course_name;
      let val = item.course_id;
      this.courseDictList[key] = val;
    });
    this.$store.state.studentListByCollege.forEach(item => {
      let key = item.user_name;
      let val = item.student_id;
      this.studentDictList[key] = val;
    });
  },
  data() {
    return {
      scoreList: [{ score_type: "正常" }],
      multipleSelection: [],
      activeName: "first",
      file: [],
      courseDictList: {},
      studentDictList: {}
    };
  },
  methods: {
    // 表格复选框回调
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 添加一行或者删除一行
    addOrRemove(scope, flag) {
      if (flag) {
        // 删除
        if (this.scoreList.length !== 1) {
          this.scoreList.splice(scope.$index, 1);
        }
      } else {
        // 添加
        this.scoreList.push({ score_type: "正常" });
      }
    },
    // 批量删除
    allDelete() {
      const res = this.scoreList.filter(
        item => this.multipleSelection.indexOf(item) === -1
      );
      this.scoreList = res;

      if (this.scoreList.length === 0) {
        this.scoreList.push({});
      }
    },
    // 读取文件
    async uploadFile(params) {
      const _file = params.file;
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          for (let sheet in workbook.Sheets) {
            //循环读取每个文件
            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            const res = sheetArray.map(item => {
              let studentId = item["学生姓名"];
              let course_id = item["课程名称"];
              return {
                course_id: this.courseDictList[course_id],
                student_id: this.studentDictList[studentId],
                score: item["成绩"],
                score_desc: item["成绩备注"],
                score_type: item["成绩类型"]
              };
            });
            this.scoreList = res;
          }
        } catch (e) {
          this.$message.warning("文件类型不正确！");
        }
      };
      fileReader.readAsBinaryString(_file);
    },
    // 重置
    resetClick() {
      this.scoreList = [{ score_type: "正常" }];
      this.multipleSelection = [];
    },
    async submit() {
      let res = await addStudentScore(this.scoreList);
      if (res) {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.scoreList = [{ score_type: "正常" }];
      }
      console.log(this.scoreList);
    }
  },
  components: {
    ScoreForm
  }
};
</script>

<style lang="scss" scoped>
@import "./AddScore.scss";
</style>
