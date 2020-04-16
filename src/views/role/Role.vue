<template>
  <div class="role-box">
    <div class="header cl">
      <el-button type="primary" class="fr" @click="addRoleDialog"
        >添加角色</el-button
      >
    </div>
    <div class="content">
      <el-table :data="roleList" border style="width: 100%" v-loading="loading">
        <el-table-column
          label="序号"
          width="100"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column prop="role_id" label="角色id" align="center">
        </el-table-column>
        <el-table-column prop="role_name" label="角色名" align="center">
        </el-table-column>
        <el-table-column label="查看范围" align="center" width="520">
          <template slot-scope="scope">
            <el-tag
              v-for="item in scope.row.role_rank"
              :key="item.id"
              style="margin:3px"
              >{{ item.title }}</el-tag
            >
          </template>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <el-form :model="role" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="role.role_name"></el-input>
        </el-form-item>
        <el-form-item label="范围">
          <el-tree
            ref="tree"
            :data="treeData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            @check="nodeClick"
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
import { addRole, editRole, removeRole } from "@api/role.js";

export default {
  data() {
    return {
      loading: true,
      role: {
        role_id: -1,
        role_name: "",
        role_rank: []
      },
      isEdit: false,
      dialogVisible: false,
      treeData: MenuList,
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  created() {
    // console.log(MenuList);
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch("getAllRoll");
    this.loading = false;
  },
  methods: {
    handleClick(row, flag) {
      if (flag) {
        // 编辑
        this.dialogVisible = true;
        this.isEdit = true;
        // this.editUserObj = Object.assign({}, row);
        let keys = row.role_rank.reduce((pre, item) => {
          pre.push(item.id);
          return pre;
        }, []);

        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(keys);
          this.role = {
            role_id: row.role_id,
            role_name: row.role_name,
            role_rank: JSON.stringify(this.$refs.tree.getCheckedNodes())
          };
        });
      } else {
        // 删除
        this.$confirm("确定要删除此记录吗？是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            await removeRole(row.role_id);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.loading = true;
            this.$store.dispatch("getAllRoll");
            this.loading = false;
          })
          .catch(() => {});
      }
    },
    nodeClick(a, b) {
      this.role.role_rank = JSON.stringify(b.checkedNodes);
    },
    addRoleDialog() {
      this.isEdit = false;
      this.dialogVisible = true;
    },
    handleClose() {
      this.role = {
        role_id: -1,
        role_name: "",
        role_rank: ""
      };
      this.$refs.tree.setCheckedKeys([]);
      this.dialogVisible = false;
    },
    async closeDialog(flag) {
      if (flag) {
        let result;
        if (!this.isEdit) {
          result = await addRole(this.role);
        } else {
          // 编辑用户
          result = await editRole(this.role);
        }
        if (result) {
          this.$message({
            message: this.isEdit ? "更新成功" : "添加成功",
            type: "success"
          });
          this.loading = true;
          this.$store.dispatch("getAllRoll");
          this.loading = false;
          this.dialogVisible = false;
        }
      }

      this.handleClose();
    }
  },
  computed: {
    roleList() {
      const roleList = this.$store.state.roleList || [];
      roleList.forEach(role => {
        const menuList = JSON.parse(role.role_rank);
        role.role_rank = menuList.reduce((pre, menuItem) => {
          if (!menuItem.children) {
            pre.push({ title: menuItem.title, id: menuItem.id });
          }
          return pre;
        }, []);
      });
      return roleList;
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
