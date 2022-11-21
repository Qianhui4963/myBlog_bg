<template>
  <div class="app-container" v-loading="loading">   
    <!-- 搜索评论 -->
    <!-- <el-form
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
          >搜索</el-button
        >
      </el-form-item>
    </el-form> -->
    
    <!-- 评论列表 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope"
          ><el-image
            style="width: 70px"
            :src="scope.row.avatar"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        align="center"
      ></el-table-column>
      <el-table-column label="评论文章" align="center">
        <template slot-scope="scope">{{
          scope.row.blog.title
        }}</template></el-table-column
      >
      <el-table-column
        prop="content"
        label="评论内容"
        align="center"
        width="250"
      ></el-table-column>
      <el-table-column label="创建日期" align="center" width="200">
        <template slot-scope="scope">{{
          formatDate(scope.row.createDate)
        }}</template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
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
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="parmas.page"
      :page-sizes="[5, 8, 10]"
      :page-size="parmas.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import { getComments, deleteComment } from "@/api/comment";
import formatDate from "@/utils/formatDate";
export default {
  name: "comment",
  mixins: [fetchData()],
  data() {
    return {
      total: 1,
      parmas: {
        page: 1,
        limit: 5,
      },
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      let { data } = await getComments(this.parmas);
      this.data = data.rows;
      this.total = data.total;
      this.loading = false;
      return data.rows;
    },
    handleSizeChange(val) {
      this.parmas.limit = val;
      this.fetchData();
      // 每页条数发生变化
    },
    handleCurrentChange(val) {
      // 当前页数发生变化
      this.parmas.page = val;
      this.fetchData();
    },
    handleDelete({ id }) {
      this.$confirm("您确定要删除这条评论吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteComment(id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    formatDate,
  },
};
</script>

<style lang="scss" scoped>
.comment {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
