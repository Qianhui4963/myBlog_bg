<template>
  <div class="app-container">
    <h3 class="block">关于我</h3>
    <p class="item">
      <el-input v-model="url" :disabled="iptDis"> </el-input>
    </p>
    <el-button type="primary" :disabled="btnDisabled" @click="handkeClick">{{
      text
    }}</el-button>
  </div>
</template>

<script>
import { getAbouts, setAbout } from "@/api/about";
export default {
  name: "about",
  data() {
    return {
      url: "",
      btnDisabled: false,
      mode: "view",
      iptDis: true,
      text: "开始编辑",
    };
  },
  methods: {
    async fetchData() {
      let res = await getAbouts();
      this.url = res.data;
    },
    handkeClick() {
      if (this.mode == "view") {
        this.mode = "edit";
        this.text = "提交编辑";
        this.iptDis = !this.iptDis;
      } else {
        if (this.url) {
          this.iptDis = true;
          this.btnDisabled = true;
          setAbout({ url: this.url }).then(() => {
            this.$message.success("编辑成功");
            this.$router.push("/");
          });
        } else {
          this.$message.error("输入框不能为空");
        }
      }
    },
  },
  async created() {
    await this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
</style>
