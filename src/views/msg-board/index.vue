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

    <!-- 留言列表 -->
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
      <el-table-column
        prop="content"
        label="留言内容"
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
import { getMsgs ,deleteMsg} from "@/api/msg";
import formatDate from "@/utils/formatDate";
export default {
  name: "Msg-board",
  mixins: [fetchData()],
  data() {
    return {
      total: 0,
      parmas: {
        page: 1,
        limit: 5,
      },
    };
  },
  methods: {
    formatDate,
    async fetchData() {
      this.loading = true;
      let { data } = await getMsgs(this.parmas);
      this.loading = false;
      this.total = data.total;
      return data.rows;
    },
    handleDelete({id}) {
      // 处理删除评论
      this.$confirm("您确定要删除这条留言吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMsg(id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            getMsgs(this.parmas).then(({ data: { total, rows: data } }) => {
              this.total = total;
              this.data = data;
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
    async handleSizeChange(val) {
      // 处理页容量发生改变
      this.parmas.limit = val;
      this.data = await this.fetchData();
    },
    async handleCurrentChange(val) {
      // 处理页码发生改变
      this.parmas.page = val;
      this.data = await this.fetchData();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
