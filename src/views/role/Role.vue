<template>
  <div class="role-box">
    <div class="header cl">
      <el-button type="primary" class="fr" @click="addRole">添加角色</el-button>
    </div>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          label="序号"
          width="100"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column prop="date" label="角色名" align="center">
        </el-table-column>
        <el-table-column prop="name" label="查看范围" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作" width="120">
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
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="500px">
      <el-form :model="role" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="role.name"></el-input>
        </el-form-item>
        <el-form-item label="范围">
          <el-tree
            ref="tree"
            :data="treeData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog(false)">取 消</el-button>
        <el-button type="primary" @click="closeDialog(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MenuList from "@c/menu/menuConfig.js";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      role: {
        name: ""
      },
      dialogVisible: false,
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  created() {
    console.log(MenuList);
  },
  methods: {
    handleClick(row, flag) {
      if (flag) {
        // 编辑
        // this.dialogVisible = true;
        // this.editUserObj = Object.assign({}, row);
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
    },
    addRole() {
      this.treeData = MenuList;
      this.dialogVisible = true;
    },
    closeDialog(flag) {
      if (flag) {
        console.log(this.$refs.tree.getCheckedNodes());
      } else {
        this.dialogVisible = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.role-box {
  padding: 20px;
  border-radius: 10px;
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  .header {
    padding: 20px;
  }
}
</style>
