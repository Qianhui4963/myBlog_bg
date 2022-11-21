<template>
  <div class="app-container">
    <h3>编辑文章</h3>
    <EditArticle mode="edit" />
  </div>
</template>

<script>
import EditArticle from "@/components/EditArticle/index.vue";
export default {
  name: "edit",
  components: {
    EditArticle,
  },
};
</script>

<style>
</style>