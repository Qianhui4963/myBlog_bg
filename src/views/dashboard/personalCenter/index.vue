<template>
  <div class="app-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input
          type="password"
          v-model="form.oldLoginPwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="loginPwd">
        <el-input
          type="password"
          v-model="form.loginPwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="form.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo, setAdmin } from "@/api/user";
export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.loginPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        loginId: "",
        name: "",
        oldLoginPwd: "",
        loginPwd: "",
        checkPass: "",
      },
      rules: {
        name: [
          { required: true, trigger: "blur", message: "请输入管理员名称" },
        ],
        oldLoginPwd: [
          { required: true, trigger: "blur", message: "请输入旧密码" },
        ],
        loginPwd: [
          { required: true, trigger: "blur", message: "请输入新密码" },
          { min: 6, max: 15, message: "长度需要在6到15之间" },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          setAdmin(this.form).then((res) => {
            if (typeof res == "string") {
              // 修改失败
              let { msg } = JSON.parse(res);
              this.$message.error(msg);
            } else {
              // 修改成功
              this.$message.success("修改密码成功");
              this.$store.dispatch("user/logout").then(() => {
                this.$router.push(`/login?redirect=${this.$route.fullPath}`);
              });
            }
          });
        } else {
          this.$message.error("请填写完整");
        }
      });
    },
    resetForm() {},
  },
  created() {
    getInfo().then(({ data: { name, loginId } }) => {
      this.form.name = name;
      this.form.loginId = loginId;
    });
  },
};
</script>

<style>
</style>