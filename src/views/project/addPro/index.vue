<template>
  <div class="app-container" v-loading="loading">
    <el-form :rules="rules" ref="addProjectForm" :model="form">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item
        label="项目描述（每一个描述用英文逗号分隔）"
        prop="description"
      >
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="项目地址" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="github地址" prop="github">
        <el-input v-model="form.github"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="项目预览图" prop="thumb"
            ><UpLoad v-model="form.thumb" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="排序等级">
            <el-select v-model.number="form.order" placeholder="请选择排序等级">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button
          style="margin-top: 15px"
          type="primary"
          :disabled="btnDisabled"
          @click="handleSubmit"
          >提交编辑</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addProject } from "@/api/project";
import UpLoad from "@/components/UpLoad/index.vue";
export default {
  name: "project-addPro",
  data() {
    return {
      btnDisabled: false,
      loading: false,
      form: {
        name: "",
        order: 1,
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入项目名称" }],
        description: [
          { required: true, trigger: "change", message: "请输入项目描述" },
        ],
        url: [{ required: true, trigger: "blur", message: "请输入项目地址" }],
        github: [
          { required: true, trigger: "blur", message: "请输入github地址" },
        ],
        thumb: [
          { required: true, trigger: "blur", message: "请选择项目预览图" },
        ],
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.btnDisabled = true;
      this.loading = true;
      console.log(this.$refs.addProjectForm);
      this.$refs.addProjectForm.validate((valid) => {
        if (valid) {
          addProject({
            ...this.form,
            description: this.form.description.split(","),
          }).then((res) => {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            console.log(res);
          });
        } else {
          this.$message.error("请填写完整表单");
        }
      });
      this.$router.push("/project/table");
    },
  },
  components: {
    UpLoad,
  },
};
</script>

<style lang="scss" scoped>
</style>
