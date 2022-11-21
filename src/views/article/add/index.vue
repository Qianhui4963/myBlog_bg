<template>
  <div class="app-container">
    <h3>添加文章</h3>
    <EditArticle mode="add" />
  </div>
</template>

<script>
import EditArticle from "@/components/EditArticle/index.vue";
export default {
  name: "add",
  components: {
    EditArticle,
  },
};
</script>

<style>
</style>