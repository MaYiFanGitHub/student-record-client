<template>
  <div class="user-add">
    <el-tabs v-model="activeName">
      <el-tab-pane label="添加单个用户" name="first">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">添加</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="批量导入用户" name="second">
        <div class="user-add-header cl">
          <el-button type="primary" class="fr" icon="el-icon-bottom-right"
            >导入用户</el-button
          >
          <el-button type="text" class="fr">下载导入模板</el-button>
        </div>
        <div class="user-add-content">
          <div><el-button type="text" class="fl all">批量删除</el-button></div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="日期" width="120">
              <template slot-scope="scope"
                ><el-input v-model="scope.row.date"></el-input
              ></template>
            </el-table-column>
            <el-table-column label="姓名" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="地址" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.address"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="地址" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.address"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="地址" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.address"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="user-add-footer">
          <el-button type="primary">提交</el-button>
          &nbsp;&nbsp;
          <el-button>重置</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎5",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎6",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎7",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [],
      activeName: "first",
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./AddUser.scss";
</style>
