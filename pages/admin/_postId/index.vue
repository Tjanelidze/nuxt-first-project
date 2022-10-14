<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm.vue'

export default {
  layout: 'admin',
  components: {
    AdminPostForm,
  },
  data() {
    return {
      loadedPost: {
        author: 'Tedo',
        title: 'Chqim Post',
        content: 'Super Amazing chqim Post',
        thumbnailLink:
          'https://youmatter.world/app/uploads/sites/2/2019/11/tech-planet.jpg',
      },
    }
  },
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
