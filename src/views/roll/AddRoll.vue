<template>
  <div class="add-college">
    <el-form ref="rollObj" :model="rollObj" label-width="120px" :rules="rules">
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="学生ID" prop="student_id">
            <el-input v-model="rollObj.student_id" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学生姓名" prop="user_name">
            <el-input v-model="rollObj.user_name" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="学籍异动类型" prop="roll_type">
            <el-select
              v-model="rollObj.roll_type"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option label="休学" value="休学"></el-option>
              <el-option label="复学" value="复学"></el-option>
              <el-option label="退学" value="退学"></el-option>
              <el-option label="留级" value="留级"></el-option>
              <el-option label="当兵入伍" value="当兵入伍"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="学生描述" prop="roll_desc">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 16 }"
              placeholder="请输入内容"
              v-model="rollObj.roll_desc"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="3">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addRoll } from "@api/roll";
import Moment from "moment";
export default {
  props: [],
  mounted() {
    // 获取院长身份的角色
  },
  data() {
    return {
      rollObj: {
        student_id: this.$store.state.userInfo.student_id,
        user_name: this.$store.state.userInfo.user_name,
        roll_type: "",
        roll_desc: ""
      },

      rules: {
        roll_type: {
          required: true,
          message: "请选择学籍异动类型",
          trigger: "blur"
        },
        roll_desc: {
          required: true,
          message: "请输入描述",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["rollObj"].validate(async valid => {
        if (valid) {
          let result;
          this.rollObj.roll_begin_time = Moment(Date.now()).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          result = await addRoll(this.rollObj);
          console.log(this.rollObj);
          if (result) {
            this.rollObj = {
              student_id: this.$store.state.userInfo.student_id,
              user_name: this.$store.state.userInfo.user_name
            };
            this.$message({
              type: "success",
              message: this.$route.params.flag ? "编辑成功!" : "添加成功!"
            });
          }
          if (this.$route.params.flag) {
            this.goBack();
          }
        }
      });
    },
    resetForm() {
      this.$refs["rollObj"].resetFields();
      this.rollObj = {
        student_id: this.$store.state.userInfo.student_id,
        user_name: this.$store.state.userInfo.user_name
      };
    },
    goBack() {
      this.$router.back();
    }
  },
  computed: {
    userCollegeList() {
      let res = this.$store.state.userCollegeList;
      const { flag, data } = this.$route.params;
      if (flag) {
        res.unshift({ user_id: data.user_id, user_name: data.user_name });
      }
      return res;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-college {
  width: 1200px;
  margin: 0 auto;
  border-radius: 10px;
}
.el-form {
  padding-top: 30px;
  background-color: #fff;
}
.el-page-header {
  padding: 0px 30px 50px;
}
</style>
