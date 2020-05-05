<template>
  <div class="user-add">
    <el-tabs v-model="activeName">
      <el-tab-pane label="添加单个用户" name="first">
        <UserForm :roleList="roleList"></UserForm>
      </el-tab-pane>
      <el-tab-pane
        label="批量导入管理员"
        name="second"
        v-if="$store.state.userInfo.role_id === 0"
      >
        <AddManager></AddManager>
      </el-tab-pane>
      <el-tab-pane
        label="批量导入院长"
        name="three"
        v-if="$store.state.userInfo.role_id === 0"
      >
        <AddDean></AddDean>
      </el-tab-pane>
      <el-tab-pane
        label="批量导入教师"
        name="four"
        v-if="$store.state.userInfo.role_id === 4"
      >
        <AddTeacher></AddTeacher>
      </el-tab-pane>
      <el-tab-pane
        label="批量导入教秘"
        name="five"
        v-if="$store.state.userInfo.role_id === 1"
      >
        <AddTeacherSec></AddTeacherSec>
      </el-tab-pane>
      <el-tab-pane
        label="批量导入学生"
        name="six"
        v-if="$store.state.userInfo.role_id === 4"
      >
        <AddStudent></AddStudent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserForm from "./UserForm";
import AddManager from "./AddManager";
import AddDean from "./AddDean";
import AddTeacher from "./AddTeacher";
import AddTeacherSec from "./AddTeacherSec";
import AddStudent from "./AddStudent";
import XLSX from "xlsx";
import { mapState } from "vuex";
import { addMoreUser } from "@api/user";
export default {
  mounted() {
    this.$store.dispatch("getAllRoll");
  },
  data() {
    return {
      userList: [{}],
      multipleSelection: [],
      activeName: "first",
      file: [],
      loading: false
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
        if (this.userList.length !== 1) {
          this.userList.splice(scope.$index, 1);
        }
      } else {
        // 添加
        this.userList.push({});
      }
    },
    // 批量删除
    allDelete() {
      const res = this.userList.filter(
        item => this.multipleSelection.indexOf(item) === -1
      );
      this.userList = res;

      if (this.userList.length === 0) {
        this.userList.push({});
      }
    },
    async addMoreUser() {
      const result = await addMoreUser(this.userList);
      if (result) {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.userList = [{}];
      }
    },
    // 读取文件
    async uploadFile(params) {
      const _file = params.file;
      const fileReader = new FileReader();
      this.loading = true;
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
              return {
                user_username: item["用户名"],
                user_password: item["密码"],
                role_id: item[Object.keys(item)[2]],
                user_name: item["姓名"],
                user_sex: item["性别"],
                user_age: item["年龄"],
                user_address: item["籍贯"],
                user_nation: item["民族"],
                user_tel: item["手机"],
                user_birthday: this.$.formatDate(item["出生日期"]),
                user_last_name: item["曾用名"],
                user_heath: item["健康状况"],
                user_culture: item["文化程度"]
              };
            });
            this.userList.push(...res);
          }
          this.loading = false;
        } catch (e) {
          this.$message.warning("文件类型不正确！");
        }
      };
      fileReader.readAsBinaryString(_file);
    },
    // 重置
    resetClick() {
      this.userList = [{}];
      this.multipleSelection = [];
    }
  },
  computed: {
    ...mapState(["roleList"])
  },
  components: {
    UserForm,
    AddManager,
    AddDean,
    AddTeacher,
    AddTeacherSec,
    AddStudent
  }
};
</script>

<style lang="scss" scoped>
@import "./AddUser.scss";
</style>
