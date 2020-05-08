<template>
  <div class="add-major">
    <el-form
      ref="majorObj"
      :model="majorObj"
      label-width="100px"
      :rules="rules"
    >
      <el-page-header
        @back="goBack"
        content="专业编辑"
        v-if="$route.params.flag"
      >
      </el-page-header>
      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="所属学院" prop="college_id">
            <el-select
              v-model="majorObj.college_id"
              placeholder="请选择"
              style="width:100%"
              disabled
            >
              <el-option
                :label="college.college_name"
                :value="college.college_id"
                v-for="college in collegeList"
                :key="college.college_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专业名称" prop="specialty_name">
            <el-input v-model="majorObj.specialty_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="40">
        <el-col :span="8" :offset="3">
          <el-form-item label="专业描述" prop="specialty_desc">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 16 }"
              placeholder="请输入内容"
              v-model="majorObj.specialty_desc"
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
import { getCollegeSelect } from "@api/college.js";
import { addMajor, editMajor } from "@api/major.js";
export default {
  props: [],
  async mounted() {
    // 查询所有学院
    const result = await getCollegeSelect();
    this.collegeList = result;
    this.majorObj.college_id = this.$store.state.userInfo.college_id;
    const { flag, data } = this.$route.params;
    if (flag) {
      this.majorObj = data;
    }
  },
  data() {
    return {
      majorObj: {
        specialty: "",
        college_id: "",
        specialty_name: "",
        specialty_desc: ""
      },

      rules: {
        college_id: {
          required: true,
          message: "请选择学院",
          trigger: "blur"
        },
        specialty_name: {
          required: true,
          message: "请输入专业名称",
          trigger: "blur"
        }
      },
      collegeList: []
    };
  },
  methods: {
    onSubmit() {
      this.$refs["majorObj"].validate(async valid => {
        if (valid) {
          let result;
          if (this.$route.params.flag) {
            result = await editMajor(this.majorObj);
          } else {
            result = await addMajor(this.majorObj);
          }

          if (result) {
            this.majorObj = {
              college_id: this.$store.state.userInfo.college_id
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
      this.$refs["majorObj"].resetFields();
      this.majorObj.college_id = this.$store.state.userInfo.college_id;
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.add-major {
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
