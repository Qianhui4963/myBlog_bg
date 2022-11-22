<template>
  <div class="edit-container">
    <!-- 文章标题 -->
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"> </el-input>
    </div>

    <!-- 文章编辑 -->
    <div class="block">文章编辑</div>
    <Editor ref="articleEditor" :options="editorOptions" height="600px" />

    <!-- 文章描述 -->
    <div class="block">文章描述</div>
    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.description">
    </el-input>

    <!-- 文章头图 -->
    <UpLoad upLoadTitle="上传图片" v-model="form.thumb" />

    <!-- 选择分类 -->
    <div class="block">选择分类</div>
    <el-select v-model="form.categoryId" @change="handleChange" placeholder="请选择文章分类">
      <el-option v-for="item in blogType" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>

    <!-- 发布按钮 -->
    <div>
      <el-button style="margin-top: 15px" type="primary" :disabled="btnDisabled" @click="handleSubmit">提交编辑</el-button>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import { Editor } from "@toast-ui/vue-editor";
import UpLoad from "@/components/UpLoad/index.vue";
import { getBlogType } from "@/api/blogType.js";
import { editBlog, findOneBlog, addBlog } from "@/api/blog.js";
import getMarkInfo from "@/utils/renderTOC.js"
export default {
  name: "edit-article",
  props: ["mode"],
  data() {
    return {
      id: "", // 根据id得到要编辑的文章
      form: {
        title: "", // 文章标题
        description: "", // 文章描述
        thumb: "", //文章图片
        categoryId: "", //文章分类
      },
      blogType: [],
      editorOptions: {
        language: "zh-CN"
      },
      btnDisabled: false,
    };
  },
  mounted() {
    window.edit = this.$refs.articleEditor
  },
  methods: {
    handleChange() {
      // 处理下拉列表BUG
      this.$forceUpdate();
    },
    async handleSubmit() {
      // 处理添加/编辑
      let markdown = this.$refs.articleEditor.invoke("getMarkdown");
      let { html, toc } = getMarkInfo(markdown)
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(), // 传入当前的时间戳
        categoryId: this.form.categoryId,
        htmlContent: html || "",
        toc,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      if (obj.title && obj.description && obj.htmlContent && obj.categoryId) {
        this.btnDisabled = true;
        if (this.mode == "edit") {
          await editBlog(this.id, obj).then((res) => {
            this.$message.success("操作成功");
          });
        } else if (this.mode == "add") {
          console.log(obj)
          console.log(JSON.stringify(obj))
          // await addBlog(obj).then((res) => {
          //   this.$message.success("操作成功");
          // });
        } else {
          this.$message.error("添加或修改失败");
          this.$router.push("/");
        }
        this.$router.push("/article/table");
      } else {
        this.$message.error("请填写所有内容");
      }
    },
  },
  created() {
    // 获取博客文章分类
    this.id = this.$route.params.id;
    getBlogType().then(({ data }) => {
      this.blogType = data;
    });
    if (this.mode == "edit") {
      findOneBlog(this.id).then(({ data }) => {
        this.form = data;
        this.form.categoryId = data.category.id;
        this.$refs.articleEditor.invoke("setHTML", data.htmlContent);
      });
    }
  },
  components: {
    Editor,
    UpLoad,
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>
