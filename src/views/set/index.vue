<template>
  <div class="app-container" v-loading="loading">
    <h2 class="block">网站信息</h2>
    <h3 class="block">网站标题</h3>
    <p class="item">
      <el-input v-model="data.siteTitle" :disabled="iptDis"> </el-input>
    </p>
    <h3 class="block">邮箱</h3>
    <p class="item">
      <el-input v-model="data.mail" :disabled="iptDis"> </el-input>
    </p>
    <h3 class="block">备案号</h3>
    <p class="item">
      <el-input v-model="data.icp" :disabled="iptDis"> </el-input>
    </p>
    <UpLoad class="space_bt" v-model="data.avatar" upLoadTitle="网站头像信息" />
    <p class="line"></p>

    <h2 class="block">网站图标信息</h2>
    <h3 class="block">网站图标地址</h3>
    <p class="item">
      <el-input v-model="data.favicon" :disabled="iptDis"> </el-input>
    </p>
    <UpLoad
      class="space_bt"
      v-model="data.favicon"
      upLoadTitle="网站图标预览"
    />
    <p class="line"></p>

    <h2 class="block">github 信息</h2>
    <h3 class="block">github 名字</h3>
    <p class="item">
      <el-input v-model="data.githubName" :disabled="iptDis"> </el-input>
    </p>
    <h3 class="block">github 地址</h3>
    <p class="item">
      <el-input v-model="data.github" :disabled="iptDis"> </el-input>
    </p>
    <p class="line"></p>

    <h2 class="block">QQ 信息</h2>
    <h3 class="block">qq 号码</h3>
    <p class="item">
      <el-input v-model="data.qq" :disabled="iptDis"> </el-input>
    </p>
    <UpLoad
      class="space_bt"
      v-model="data.qqQrCode"
      upLoadTitle="QQ 二维码图片预览"
    />
    <p class="line"></p>

    <h2 class="block">微信 信息</h2>
    <h3 class="block">微信号</h3>
    <p class="item">
      <el-input v-model="data.weixin" :disabled="iptDis"> </el-input>
    </p>
    <UpLoad
      class="space_bt"
      v-model="data.weixinQrCode"
      upLoadTitle="微信二维码图片预览"
    />
    <p class="line"></p>

    <el-button type="primary" :disabled="btnDisabled" @click="handkeClick">{{
      text
    }}</el-button>
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import { getSettingInfo, setSettingInfo } from "@/api/setting";
import UpLoad from "@/components/UpLoad/index.vue";
export default {
  name: "set",
  mixins: [fetchData()],
  data() {
    return {
      iptDis: true,
      btnDisabled: false,
      mode: "view",
      text: "开始编辑",
    };
  },
  components: {
    UpLoad,
  },
  methods: {
    async fetchData() {
      let { data } = await getSettingInfo();
      this.loading = false;
      return data;
    },
    handkeClick() {
      if (this.mode == "view") {
        this.mode = "edit";
        this.text = "提交编辑";
        this.iptDis = !this.iptDis;
      } else {
        this.iptDis = true;
        this.btnDisabled = true;
        setSettingInfo(this.data).then(() => {
          this.$message.success("编辑成功");
          this.$router.push("/");
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  max-width: 40vw;
  min-width: 600px;
}
.space_bt {
  margin-bottom: 20px;
}
.line {
  border-top: 1px solid #dcdfe6;
}
</style>
