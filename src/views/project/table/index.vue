<template>
  <div class="app-container" v-loading="loading">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称" width="250">
      </el-table-column>
      <el-table-column label="项目描述" align="center">
        <template slot-scope="scope">{{
          scope.row.description.toString()
        }}</template>
      </el-table-column>
      <el-table-column label="预览图" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.thumb"
            :preview-src-list="srcList"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="前往github"
            placement="top"
            :hide-after="2000"
          >
            <a
              style="margin-right: 10px"
              :href="scope.row.github"
              target="_blank"
            >
              <el-button
                type="primary"
                icon="el-icon-s-promotion"
                circle
                size="mini"
              ></el-button
            ></a>
          </el-tooltip>
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

    <!-- 弹出编辑框 -->
    <el-dialog title="请编辑信息" top="3vh" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述（每一个描述用英文逗号分隔）">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="项目地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="github地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="项目预览图"
              ><UpLoad v-model="form.thumb" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="排序等级">
              <el-select v-model="form.order" placeholder="请选择排序等级">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditBanner">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import { getProjects, setProject, deleteProject } from "@/api/project";
import UpLoad from "@/components/UpLoad/index.vue";
export default {
  name: "project-table",
  data() {
    return {
      dialogFormVisible: false,
      srcList: [],
      form: {},
    };
  },
  mixins: [fetchData()],
  methods: {
    async fetchData() {
      this.loading = true;
      let { data } = await getProjects();
      this.loading = false;
      for (const item of data) {
        this.srcList.push(item.thumb);
      }
      return data || [];
    },
    handleEdit(row) {
      // 处理编辑操作
      this.form = { ...row };
      this.form.description = this.form.description.toString();
      this.dialogFormVisible = true;
    },
    handleDelete({ id }) {
      // 处理删除操作
      this.$confirm("是否删除该项目", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteProject(id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            location.reload();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    confirmEditBanner() {
      // 处理修改成功操作
      this.dialogFormVisible = false;
      setProject({
        ...this.form,
        description: this.form.description.split(","),
      }).then(() => {
        this.$message({
          type: "success",
          message: "编辑成功!",
        });
        location.reload();
      });
    },
  },
  components: {
    UpLoad,
  },
};
</script>

<style lang="scss" scoped>
.table {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
