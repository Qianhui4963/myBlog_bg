<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="文章名称" width="250">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            :title="scope.row.title"
            width="200"
            trigger="hover"
            ><el-image
              style="width: 100px; height: 100px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a href="#" target="_blank" slot="reference">{{
              scope.row.title
            }}</a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="文章描述"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="scanNumber"
        label="浏览数"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="commentNumber"
        label="评论量"
        align="center"
      ></el-table-column>
      <el-table-column prop="category" label="所属分类" align="center">
        <template slot-scope="scope">{{ scope.row.category.name }}</template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建日期" align="center">
        <template slot-scope="scope">{{
          formatDate(scope.row.createDate)
        }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
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
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 8, 10]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getBlog, deleteBlog } from "@/api/blog";
import formatDate from "@/utils/formatDate";
export default {
  name: "article-table",
  data() {
    return {
      data: [],
      total: 0,
      page: 1,
      limit: 5,
      srcList: [],
    };
  },
  created() {
    this.fetchData({
      page: this.page,
      limit: this.limit,
    });
  },
  methods: {
    formatDate,
    fetchData(params) {
      this.srcList = [];
      getBlog(params).then(({ data }) => {
        this.data = data.rows;
        this.total = data.total;
      });
    },
    handleSizeChange(val) {
      // 处理页容量发生改变
      this.limit = val;
      this.fetchData({
        page: this.page,
        limit: this.limit,
      });
    },
    handleCurrentChange(val) {
      // 处理页数发生改变
      this.page = val;
      this.fetchData({
        page: this.page,
        limit: this.limit,
      });
    },
    handleEdit(row) {
      // 处理编辑文章
      this.$router.push(`/edit/${row.id}`);
    },
    handleDelete({ id }) {
      // 处理删除文章
      this.$confirm("删除该文章并删除评论, 是否继续?", "是否删除此文章", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteBlog(id).then(() => {
            this.fetchData({
              page: this.page,
              limit: this.limit,
            });
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
