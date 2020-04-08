<template>
  <div class="add-college">
    <el-form
      ref="collegeObj"
      :model="collegeObj"
      label-width="100px"
      :rules="rules"
    >
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="学院名称" prop="college_name">
            <el-input v-model="collegeObj.college_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学院邮箱" prop="college_email">
            <el-input v-model="collegeObj.college_email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="学院电话" prop="college_tel">
            <el-input v-model="collegeObj.college_tel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="院长" prop="user_id">
            <el-select
              v-model="collegeObj.user_id"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option label="管理员" :value="0"></el-option>
              <el-option label="院长" :value="1"></el-option>
              <el-option label="教师" :value="2"></el-option>
              <el-option label="学生" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="学院办公室" prop="college_room">
            <el-input v-model="collegeObj.college_room"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="学院描述" prop="college_desc">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 16 }"
              placeholder="请输入内容"
              v-model="collegeObj.college_desc"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="3">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: [],
  mounted() {
    const { flag, data } = this.$route.params;
    if (flag) {
      this.collegeObj = data;
    }
  },
  data() {
    return {
      collegeObj: {
        college_name: "",
        college_desc: "",
        college_email: "",
        college_room: "",
        college_tel: "",
        user_id: ""
      },

      rules: {
        college_name: {
          required: true,
          message: "请输入学院名称",
          trigger: "blur"
        },
        college_tel: {
          required: true,
          message: "请输入学院电话",
          trigger: "blur"
        },
        user_id: { required: true, message: "请选择院长", trigger: "blur" },
        college_email: {
          required: true,
          message: "请输入学院邮箱",
          trigger: "blur"
        },
        college_room: {
          required: true,
          message: "请输入学院办公室",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["collegeObj"].validate(valid => {
        if (valid) {
          alert("submit!");
        }
      });
    },
    resetForm() {
      this.$refs["collegeObj"].resetFields();
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
</style>
