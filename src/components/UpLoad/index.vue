<template>
  <div>
    <div class="block">{{ upLoadTitle }}</div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :headers="headers"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    upLoadTitle: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      };
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      // 成功之后的回调
      console.log("上传完成", res);
      if (!res.code && res.data) {
        // 利用v-modle的特性，触发input事件，跟改对应的路径
        this.$emit("input", res.data);
      }
    },
    beforeAvatarUpload(res) {
      // 上传之间的回调
      console.log("上传中", res);
    },
  },
};
</script>

<style scoped>
.block {
  margin: 15px 0px;
  font-weight: 100;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover .avatar-uploader-icon {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>