<template>
  <div class="app-container">
    <!-- 添加分类 -->
    <el-form
      :inline="true"
      :model="addClassifyForm"
      :rules="addClassifyRules"
      ref="addClassifyForm"
      class="demo-form-inline"
    >
      <el-form-item label-width="150" prop="name">
        <el-input
          placeholder="请输入内容"
          v-model="addClassifyForm.name"
          class="input-with-select"
        >
          <el-select
            v-model="addClassifyForm.order"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop.prevent="handleAddClassify"
          >添加</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 分类列表 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="博客类别"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="articleCount"
        label="文章数量"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="handleEdit(scope.row)"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="handleDelete(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 编辑分类 -->
    <el-dialog title="请编辑分类" :visible.sync="dialogFormVisible">
      <el-form ref="editClassifyForm" :model="editClassifyForm" :rules="rules">
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model="editClassifyForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select
            v-model="editClassifyForm.order"
            placeholder="请选择排序等级"
          >
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.stop.prevent="handleSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType,
  deleteBlogType,
  addBlogType,
  setBlogType,
} from "@/api/blogType";

export default {
  name: "article-classify",
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      addClassifyForm: {
        name: "",
        order: 1,
      },
      addClassifyRules: {
        name: [{ required: true, message: "请输入分类名称" }],
      },
      editClassifyForm: {
        name: "",
        order: 1,
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入分类名称" }],
      },
    };
  },
  created() {
    this.fetchBlogType();
  },
  methods: {
    fetchBlogType() {
      getBlogType().then(({ data }) => {
        this.data = data;
      });
    },
    handleEdit(scope) {
      this.editClassifyForm = { ...scope };
      this.dialogFormVisible = true;
    },
    handleAddClassify() {
      // 添加分类
      this.$refs.addClassifyForm.validate((val) => {
        if (val) {
          addBlogType({
            name: this.addClassifyForm.name,
            order: this.addClassifyForm.order,
          }).then((res) => {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.fetchBlogType();
          });
        } else {
          console.log("验证失败");
        }
      });
    },
    handleSubmit() {
      // 修改博客分类
      this.$refs.editClassifyForm.validate((val) => {
        if (val) {
          setBlogType(this.editClassifyForm.id, {
            name: this.editClassifyForm.name,
            order: this.editClassifyForm.order,
          }).then(() => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.fetchBlogType();
            this.dialogFormVisible = false;
          });
        } else {
          console.log("验证失败");
        }
      });
    },
    handleDelete({ id }) {
      this.$confirm(
        "删除该分类后, 该分类的所有文章将变为未分类状态, 是否继续?",
        "是否删除该分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteBlogType(id).then(() => {
            this.fetchBlogType();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
