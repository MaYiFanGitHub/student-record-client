<template>
  <div class="user-add">
    <el-tabs v-model="activeName">
      <el-tab-pane label="添加单个课程" name="first">
        <CourseForm></CourseForm>
      </el-tab-pane>
      <el-tab-pane label="批量导入课程" name="second">
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
              >导入课程</el-button
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
            :data="courseList"
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
                ><el-input v-model="scope.row.course_name"></el-input
              ></template>
            </el-table-column>
            <el-table-column label="课时" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.course_hour"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="上课地点" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.course_classroom"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="学分" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.course_credit"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="开课学年"
              min-width="270"
              align="center"
              class="year-ipt"
            >
              <template slot-scope="scope">
                <el-col :span="11">
                  <el-date-picker
                    format="yyyy"
                    value-format="yyyy"
                    v-model="scope.row.course_year_begin"
                    type="year"
                    style="width:100%"
                  >
                  </el-date-picker>
                </el-col>
                <el-col :span="2">
                  <div style="text-align:center">-</div>
                </el-col>
                <el-col :span="11">
                  <el-date-picker
                    format="yyyy"
                    value-format="yyyy"
                    v-model="scope.row.course_year_end"
                    type="year"
                    style="width:100%"
                  >
                  </el-date-picker>
                </el-col>
              </template>
            </el-table-column>
            <el-table-column label="课容量" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.course_amount"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="课程类型" min-width="200" align="center">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.course_type"
                  placeholder="请选择课程类型"
                  style="width:100%"
                >
                  <el-option
                    label="限制性选修课"
                    value="限制性选修课"
                  ></el-option>
                  <el-option
                    label="非限制性选修课"
                    value="非限制性选修课"
                  ></el-option>
                  <el-option label="公共必修课" value="公共必修课"></el-option>
                  <el-option label="公共选修课" value="公共选修课"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="考核方式" min-width="170" align="center">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.course_assess"
                  placeholder="请选择考核方式"
                  style="width:100%"
                >
                  <el-option label="考查" value="考查"></el-option>
                  <el-option label="考试" value="考试"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="授课教师" min-width="170" align="center">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.teacher_id"
                  placeholder="请选择授课教师"
                  style="width:100%"
                >
                  <el-option
                    :label="item.user_name"
                    :value="item.teacher_id"
                    v-for="item in $store.state.userTeacherList"
                    :key="item.teacher_id"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="课程简介" min-width="170" align="center">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="scope.row.course_info"
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
                  :disabled="courseList.length === 1"
                ></el-button>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  circle
                  v-if="scope.$index === courseList.length - 1"
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
import CourseForm from "./CourseForm.vue";
import { addMoreCourse } from "@api/course";
import XLSX from "xlsx";
export default {
  mounted() {
    this.$store.dispatch("getUserTeacher");
    this.$store.state.userTeacherList.forEach(item => {
      let key = item.teacher_id;
      let val = item.user_name;
      this.tutorList[val] = key;
    });
  },
  data() {
    return {
      courseList: [{}],
      multipleSelection: [],
      activeName: "first",
      file: [],
      tutorList: {}
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
        if (this.courseList.length !== 1) {
          this.courseList.splice(scope.$index, 1);
        }
      } else {
        // 添加
        this.courseList.push({});
      }
    },
    // 批量删除
    allDelete() {
      const res = this.courseList.filter(
        item => this.multipleSelection.indexOf(item) === -1
      );
      this.courseList = res;

      if (this.courseList.length === 0) {
        this.courseList.push({});
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
              let key = item["授课教师"];
              console.log(this.tutorList[key]);
              return {
                course_name: item["课程名称"],
                course_hour: item["课时"],
                course_classroom: item["上课地点"],
                course_credit: item["学分"],
                course_year_begin: item["开课学年"].split("-")[0],
                course_year_end: item["开课学年"].split("-")[1],
                course_amount: item["课容量"],
                course_type: item["课程类型"],
                course_assess: item["考核方式"],
                teacher_id: this.tutorList[key],
                course_info: item["课程简介"]
              };
            });
            this.courseList.push(...res);
          }
        } catch (e) {
          this.$message.warning("文件类型不正确！");
        }
      };
      fileReader.readAsBinaryString(_file);
    },
    // 重置
    resetClick() {
      this.courseList = [{}];
      this.multipleSelection = [];
    },
    async submit() {
      let res = await addMoreCourse(this.courseList);
      if (res) {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.courseList = [{}];
      }
    }
  },
  components: {
    CourseForm
  }
};
</script>

<style lang="scss" scoped>
@import "./AddUser.scss";
</style>
