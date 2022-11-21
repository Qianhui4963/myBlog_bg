<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="250"></el-table-column>
      <el-table-column prop="description" label="描述">
        <template slot-scope="scope">{{
          scope.row.description
        }}</template></el-table-column
      >
      <el-table-column label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.midImg"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.bigImg"
            fit="cover"
          ></el-image
        ></template>
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
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="handleEdit(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出编辑框 -->
    <el-dialog title="请编辑信息" top="5vh" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <UpLoad v-model="form.midImg" upLoadTitle="中图预览" /> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item>
              <UpLoad v-model="form.bigImg" upLoadTitle="大图预览" /> </el-form-item
          ></el-col>
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
import { getBanner, setBanner } from "@/api/banner.js";
import UpLoad from "@/components/UpLoad/index.vue";

export default {
  name: "banner",
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      form: {
        id: "",
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBanner().then((res) => {
        this.data = res.data;
      });
    },
    handleEdit(bannerInfo) {
      this.form = { ...bannerInfo };
      this.dialogFormVisible = true;
    },
    confirmEditBanner() {
      let arr = [...this.data];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == this.form.id) {
          arr[i] = this.form;
          break;
        }
      }
      setBanner(arr).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.dialogFormVisible = false;
        this.data = res.data;
      });
    },
  },
  components: {
    UpLoad,
  },
};
</script>

<style lang="scss" scoped>
</style>
