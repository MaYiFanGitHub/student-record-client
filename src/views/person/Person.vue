<template>
  <div class="person-box">
    <div :class="{ box: true, border: baseFlag }">
      <div class="line">
        <el-divider content-position="left"><h2>个人基本资料</h2></el-divider>
      </div>
      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item style="text-align:right">
              <el-button size="mini" type="primary" @click="baseClick"
                >修改</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="学生ID:"
              label-width="100px"
              v-if="inRoleId === 3"
            >
              <el-input type="text" disabled v-model="baseObj.student_id">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="教师ID:"
              label-width="100px"
              v-if="inRoleId === 2 || inRoleId === 4"
            >
              <el-input type="text" disabled v-model="baseObj.teacher_id">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="院长ID:"
              label-width="100px"
              v-if="inRoleId === 1"
              class="not"
            >
              <el-input type="text" v-model="baseObj.user_id" disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名:" label-width="100px">
              <el-input
                type="text"
                v-model="baseObj.user_name"
                :disabled="baseFlag"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="曾用名:" label-width="100px">
              <el-input
                type="text"
                v-model="baseObj.user_last_name"
                :disabled="baseFlag"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别:" label-width="100px">
              <el-input
                type="text"
                v-model="baseObj.user_sex"
                :disabled="baseFlag"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年龄:" label-width="100px">
              <el-input
                type="text"
                v-model="baseObj.user_age"
                :disabled="baseFlag"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="政治面貌:"
              label-width="100px"
              v-if="inRoleId === 3"
            >
              <el-select
                v-model="baseObj.politics_status_id"
                placeholder="请选择政治面貌"
                style="width:100%"
                :disabled="baseFlag"
              >
                <el-option
                  :label="role.politics_status"
                  :value="role.politics_status_id"
                  v-for="role in $store.state.politicsList"
                  :key="role.politics_status_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="民族:" label-width="100px">
              <el-select
                v-model="baseObj.user_nation"
                placeholder="请选择民族"
                style="width:100%"
                :disabled="baseFlag"
              >
                <el-option label="汉族" value="汉族"></el-option>
                <el-option label="土家族" value="土家族"></el-option>
                <el-option label="蒙古族" value="蒙古族"></el-option>
                <el-option label="回族" value="回族"></el-option>
                <el-option label="苗族" value="苗族"></el-option>
                <el-option label="满族" value="满族"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机:" label-width="100px">
              <el-input
                type="text"
                v-model="baseObj.user_tel"
                :disabled="baseFlag"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="籍贯:" label-width="100px">
              <el-input
                type="text"
                v-model="baseObj.user_address"
                :disabled="baseFlag"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出生日期:" label-width="100px">
              <el-date-picker
                format="yyyy-MM-dd"
                v-model="baseObj.user_birthday"
                style="width:100%"
                :disabled="baseFlag"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身体状况:" label-width="100px">
              <el-input
                type="text"
                v-model="baseObj.user_heath"
                :disabled="baseFlag"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学历:" label-width="100px">
              <el-select
                v-model="baseObj.user_culture"
                placeholder="请选择文化程度"
                style="width:100%"
                :disabled="baseFlag"
              >
                <el-option label="小学" value="小学"></el-option>
                <el-option label="初中" value="初中"></el-option>
                <el-option label="高中" value="高中"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="研究生" value="研究生"></el-option>
                <el-option label="博士" value="博士"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="所属学院:"
              label-width="100px"
              v-if="inRoleId === 3"
            >
              <el-select
                v-model="baseObj.college_id"
                placeholder="请选择所属学院"
                style="width:100%"
                disabled
              >
                <el-option
                  v-for="college in collegeList"
                  :key="college.college_id"
                  :label="college.college_name"
                  :value="college.college_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="所属专业:"
              label-width="100px"
              v-if="inRoleId === 3"
            >
              <el-select
                v-model="baseObj.specialty"
                placeholder="请选择"
                style="width:100%"
                @change="marjorChange"
                :disabled="baseFlag || inRoleId === 3"
              >
                <el-option
                  v-for="major in majorList"
                  :key="major.specialty"
                  :label="major.specialty_name"
                  :value="major.specialty"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="所属班级:"
              label-width="100px"
              v-if="inRoleId === 3"
            >
              <el-select
                v-model="baseObj.class_id"
                placeholder="请选择班级"
                style="width:100%"
                :disabled="baseFlag || inRoleId === 3"
              >
                <el-option
                  v-for="item in classList"
                  :key="item.class_id"
                  :label="item.class_name"
                  :value="item.class_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="职称:"
              label-width="100px"
              v-if="inRoleId === 2 || inRoleId === 4"
            >
              <el-select
                v-model="baseObj.teacher_title"
                placeholder="请选择职称"
                style="width:100%"
                :disabled="baseFlag"
              >
                <el-option label="助教" value="助教"></el-option>
                <el-option label="讲师" value="讲师"></el-option>
                <el-option label="副教授" value="副教授"></el-option>
                <el-option label="教授" value="教授"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!baseFlag">
            <el-form-item style="text-align:center">
              <el-button size="small" type="primary" @click="baseHandle"
                >确定</el-button
              >
              <el-button size="small" @click="baseClick(1)">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-if="inRoleId === 3" :class="{ box: true, border: politicsFlag }">
      <div class="line">
        <el-divider content-position="left"><h2>教育经历</h2></el-divider>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form>
            <el-form-item style="text-align:right">
              <el-button size="mini" type="primary" @click="eduClick"
                >修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="table-box">
        <el-table :data="eduList" style="width: 100%">
          <el-table-column prop="edu_begin_time" label="开始时间">
            <template slot-scope="scope">
              <el-date-picker
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="scope.row.edu_begin_time"
                style="width:100%"
                :disabled="eduFlag"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="edu_end_time" label="结束时间">
            <template slot-scope="scope">
              <el-date-picker
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="scope.row.edu_end_time"
                style="width:100%"
                :disabled="eduFlag"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="学校名称">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.edu_roll_name"
                :disabled="eduFlag"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="证明人">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.edu_person"
                :disabled="eduFlag"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="证明人联系方式">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.edu_person_tel"
                :disabled="eduFlag"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" v-if="!eduFlag">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="addOrRemove(scope, true)"
                :disabled="eduList.length === 1"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                circle
                v-if="scope.$index === eduList.length - 1"
                @click="addOrRemove(scope, false)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row v-if="!eduFlag">
        <el-col :span="24">
          <el-form>
            <el-form-item style="text-align:center">
              <el-button size="small" type="primary" @click="eduHandle"
                >确定</el-button
              >
              <el-button size="small" @click="eduClick(1)">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div v-if="inRoleId === 3" :class="{ box: true, border: politicsFlag }">
      <div class="line">
        <el-divider content-position="left"><h2>家庭成员</h2></el-divider>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form>
            <el-form-item style="text-align:right">
              <el-button size="mini" type="primary" @click="familyClick"
                >修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="table-box">
        <el-table :data="familyList" style="width: 100%">
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.family_name"
                :disabled="familyFlag"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="性别">
            <template slot-scope="scope">
              <el-radio
                v-model="scope.row.family_sex"
                :disabled="familyFlag"
                label="男"
                >男</el-radio
              >
              <el-radio
                v-model="scope.row.family_sex"
                :disabled="familyFlag"
                label="女"
                >女</el-radio
              >
            </template>
          </el-table-column>
          <el-table-column label="年龄">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.family_age"
                :disabled="familyFlag"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="关系">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.family_relation"
                :disabled="familyFlag"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="工作单位">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.family_job"
                :disabled="familyFlag"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" v-if="!familyFlag">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="familyAddOrRemove(scope, true)"
                :disabled="familyList.length === 1"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                circle
                v-if="scope.$index === familyList.length - 1"
                @click="familyAddOrRemove(scope, false)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row v-if="!familyFlag">
        <el-col :span="24">
          <el-form>
            <el-form-item style="text-align:center">
              <el-button size="small" type="primary" @click="familyHandle"
                >确定</el-button
              >
              <el-button size="small" @click="familyClick(1)">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div v-if="inRoleId === 3" :class="{ box: true, border: politicsFlag }">
      <div class="line">
        <el-divider content-position="left"><h2>政治面貌</h2></el-divider>
      </div>
      <el-form>
        <el-row>
          <el-form-item style="text-align:right">
            <el-button size="mini" type="primary" @click="politicsClick"
              >修改</el-button
            >
          </el-form-item>
          <el-col :span="6">
            <el-form-item label="名称:" label-width="120px">
              <el-select
                v-model="politicsObj.politics_status_id"
                placeholder="请选择政治面貌"
                style="width:100%"
                :disabled="politicsFlag"
              >
                <el-option
                  :label="role.politics_status"
                  :value="role.politics_status_id"
                  v-for="role in $store.state.politicsList"
                  :key="role.politics_status_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="青年志愿者:" label-width="120px">
              <el-radio
                v-model="politicsObj.volunteer"
                :disabled="politicsFlag"
                :label="0"
                >是</el-radio
              >
              <el-radio
                v-model="politicsObj.volunteer"
                :disabled="politicsFlag"
                :label="1"
                >否</el-radio
              >
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="入党时间:" label-width="120px">
              <el-date-picker
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="politicsObj.begin_time"
                style="width:100%"
                :disabled="politicsFlag"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="入团时间:" label-width="120px">
              <el-date-picker
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="politicsObj.member_time"
                style="width:100%"
                :disabled="politicsFlag"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="个人思想鉴定:" label-width="120px">
              <el-input
                type="textarea"
                autocomplete="off"
                v-model="politicsObj.ideo_iden"
                :disabled="politicsFlag"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="鉴定人:" label-width="120px">
              <el-input
                type="text"
                autocomplete="off"
                v-model="politicsObj.ideo_person"
                :disabled="politicsFlag"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="团支部意见:" label-width="120px">
              <el-radio
                v-model="politicsObj.unity"
                label="同意"
                :disabled="politicsFlag"
                >同意</el-radio
              >
              <el-radio
                v-model="politicsObj.unity"
                label="不同意"
                :disabled="politicsFlag"
                >不同意</el-radio
              >
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="书记名:" label-width="120px">
              <el-input
                type="text"
                autocomplete="off"
                v-model="politicsObj.unity_person"
                :disabled="politicsFlag"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="文件材料:" label-width="120px">
              <el-upload
                class="upload-demo"
                action="//localhost:3000/api/student/uploadFile"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="onSunccess"
                multiple
                :file-list="politicsObj.fileList"
                :disabled="politicsFlag"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!politicsFlag">
            <el-form-item style="text-align:center">
              <el-button size="small" type="primary" @click="politicsHandle"
                >确定</el-button
              >
              <el-button size="small" @click="politicsClick(1)">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Monent from "moment";
import { queryMajor } from "@api/college";
import { editUser } from "@api/user";
import {
  addEduList,
  addFamilyList,
  addPolitics,
  queryPersonInfo
} from "@api/student";

export default {
  async mounted() {
    // 获取政治面貌列表
    this.$store.dispatch("getAllRoll");
    // 获取班级
    this.$store.dispatch("getAllClass");
    // 获取学院
    this.collegeList = await queryMajor();

    // 获取当前是哪种身份进入
    let userObj = this.$route.params.data || {};
    if (userObj.user_id) {
      // 学生基本信息跳转
      this.inRoleId = userObj.role_id;
    } else {
      // 个人点击进入
      this.inRoleId = this.$store.state.userInfo.role_id;
    }

    // 获取个人资料
    this.queryPersonInfo();
  },
  data() {
    return {
      baseObj: {},
      collegeList: [],
      majorList: [],
      classList: [],
      eduList: [],
      eduTempList: [],
      familyList: [],
      familyTempList: [],
      baseFlag: true,
      eduFlag: true,
      familyFlag: true,
      politicsFlag: true,
      inRoleId: -1,
      fileList: [],
      student_id: -1,
      politics_status_info_id: -1,
      politicsObj: {
        fileList: []
      }
    };
  },
  methods: {
    baseClick(params) {
      if (params == 1) {
        this.baseFlag = true;
      } else {
        this.baseFlag = false;
      }
    },
    async queryPersonInfo() {
      let userObj = this.$route.params.data || {};
      let res = await queryPersonInfo(
        userObj.user_id || this.$store.state.userInfo.user_id
      );
      this.eduList = res.eduList.map(item => {
        item.edu_begin_time = Monent(item.edu_begin_time).format("YYYY-MM-DD");
        item.edu_end_time = Monent(item.edu_end_time).format("YYYY-MM-DD");
        return item;
      });
      this.familyList = res.familyList;
      this.politicsObj = {
        fileList: res.baseInfo.fileList,
        begin_time: res.baseInfo.base.begin_time
          ? Monent(res.baseInfo.base.begin_time).format("YYYY-MM-DD")
          : "",
        ideo_iden: res.baseInfo.base.ideo_iden,
        ideo_person: res.baseInfo.base.ideo_person,
        member_time: res.baseInfo.base.member_time
          ? Monent(res.baseInfo.base.member_time).format("YYYY-MM-DD")
          : "",
        politics_status_id: res.baseInfo.base.politics_status_id,
        unity: res.baseInfo.base.unity,
        unity_person: res.baseInfo.base.unity_person,
        volunteer: res.baseInfo.base.volunteer
      };
      this.baseObj = {
        user_id: res.baseInfo.base.user_id,
        role_id: res.baseInfo.base.role_id,
        student_id: res.baseInfo.base.student_id,
        teacher_id: res.baseInfo.base.teacher_id,
        college_id: res.baseInfo.base.college_id,
        user_name: res.baseInfo.base.user_name,
        user_last_name: res.baseInfo.base.user_last_name,
        user_sex: res.baseInfo.base.user_sex,
        user_age: res.baseInfo.base.user_age,
        politics_status_id: res.baseInfo.base.politics_status_id,
        user_nation: res.baseInfo.base.user_nation,
        user_tel: res.baseInfo.base.user_tel,
        user_address: res.baseInfo.base.user_address,
        user_heath: res.baseInfo.base.user_heath,
        user_culture: res.baseInfo.base.user_culture,
        specialty: res.baseInfo.base.specialty,
        class_id: res.baseInfo.base.class_id,
        teacher_title: res.baseInfo.base.teacher_title,
        user_birthday: res.baseInfo.base.user_birthday
      };
      this.student_id = res.baseInfo.base.student_id;
      this.politics_status_info_id = res.baseInfo.base.politics_status_info_id;

      if (this.inRoleId == 3) {
        // 获取专业列表
        this.majorList = Object.assign(
          {},
          this.collegeList.find(
            college => college.college_id == this.baseObj.college_id
          )["majorList"]
        );
        // 获取班级列表
        this.classList = Object.assign(
          {},
          this.$store.state.classList.filter(
            item => item.specialty === this.baseObj.specialty
          )
        );
      }
    },
    eduClick(params) {
      if (params == 1) {
        this.eduFlag = true;
        this.eduList = Object.assign([{}], this.eduTempList);
      } else {
        this.eduTempList = Object.assign([], this.eduList);
        this.eduList.length === 0 ? (this.eduList = [{}]) : "";
        this.eduFlag = false;
      }
    },
    politicsClick(params) {
      if (params == 1) {
        this.politicsFlag = true;
      } else {
        this.politicsFlag = false;
      }
    },
    async eduHandle() {
      console.log(this.eduList, this.student_id);
      let res = await addEduList(this.eduList, this.student_id);
      console.log(res);
      if (res) {
        this.$message.success("保存成功");
        this.eduFlag = true;
        this.queryPersonInfo();
      }
    },
    async baseHandle() {
      this.baseObj.user_birthday = Monent(this.baseObj.user_birthday).format(
        "YYYY-MM-DD"
      );
      let res = await editUser(this.baseObj);
      console.log(res);
      if (res) {
        this.$message.success("保存成功");
        this.baseFlag = true;
        this.queryPersonInfo();
      }
    },
    async politicsHandle() {
      console.log(
        this.politicsObj,
        this.politics_status_info_id,
        this.student_id
      );
      let res = await addPolitics(
        this.politicsObj,
        this.politics_status_info_id,
        this.student_id
      );
      console.log(res);
      if (res) {
        this.$message.success("保存成功");
        this.politicsFlag = true;
        this.queryPersonInfo();
      }
    },
    async familyHandle() {
      let res = await addFamilyList(this.familyList, this.student_id);
      console.log(res);
      if (res) {
        this.$message.success("保存成功");
        this.familyFlag = true;
        this.queryPersonInfo();
      }
    },
    familyClick(params) {
      if (params == 1) {
        this.familyFlag = true;
        this.familyList = Object.assign([], this.familyTempList);
      } else {
        this.familyTempList = Object.assign([], this.familyList);
        this.familyList.length === 0 ? (this.familyList = [{}]) : "";
        this.familyFlag = false;
      }
    },
    marjorChange(params) {
      console.log(params);
      this.baseObj.specialty = params;
      this.classList = Object.assign(
        {},
        this.$store.state.classList.filter(item => item.specialty === params)
      );
      this.$set(this.baseObj, "class_id", "");
    },
    // 添加一行或者删除一行
    addOrRemove(scope, flag) {
      if (flag) {
        // 删除
        if (this.eduList.length !== 1) {
          this.eduList.splice(scope.$index, 1);
        }
      } else {
        // 添加
        this.eduList.push({});
      }
    },
    // 添加一行或者删除一行
    familyAddOrRemove(scope, flag) {
      if (flag) {
        // 删除
        if (this.familyList.length !== 1) {
          this.familyList.splice(scope.$index, 1);
        }
      } else {
        // 添加
        this.familyList.push({});
      }
    },
    handleRemove(file) {
      console.log(file);
      let index = this.politicsObj.fileList.findIndex(
        item => file.file_id === item.file_id
      );
      this.politicsObj.fileList.splice(index, 1);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onSunccess(response) {
      this.politicsObj.fileList.push({
        url: response.url,
        file_id: response.file_id,
        name: response.name
      });
    }
  },
  computed: {
    ...mapState(["roleList"])
  }
};
</script>

<style lang="scss">
.person-box {
  .border {
    input {
      border: none;
    }
  }
  .not {
    input {
      border: none !important;
    }
  }
  .is-disabled input {
    background-color: #fff !important;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  .el-radio__input.is-disabled + span.el-radio__label {
    color: #606266;
  }
  input:disabled {
    color: #606266 !important;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background: #fff !important;
    color: #606266 !important;
    border: none;
  }
  .box {
    padding: 0 30px 30px;
    background-color: #fff;
    margin-bottom: 20px;
    .line {
      padding: 20px 0 0;
    }
    .table-box {
      padding: 0 40px;
      margin-bottom: 10px;
    }
  }
  .el-form-item__label {
    font-weight: bold !important;
  }
  h2 {
    font-size: 16px;
    &::after {
      content: "";
      position: absolute;
      width: 4px;
      height: 15px;
      left: 10px;
      top: 4px;
      background-color: #409eff;
    }
  }
}
</style>
