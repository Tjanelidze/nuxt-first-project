<template>
  <section class="posts-list">
    <PostPreview
      id="1"
      thumbnail="https://www.itu.int/hub/wp-content/uploads/sites/4/2021/10/Lets-build-consensus-on-how-new-tech-should-factor-into-our-future.jpg"
      title="Hello There!"
      previewText="This is my first post!"
    />
    <PostPreview
      id="2"
      thumbnail="https://www.agilitypr.com/wp-content/uploads/2020/02/technology-1-1.jpg"
      title="Hello There! - 2"
      previewText="This is my second post!"
    />
    <PostPreview
      id="3"
      thumbnail="https://youmatter.world/app/uploads/sites/2/2019/11/tech-planet.jpg"
      title="Gamarjoba"
      previewText="Chqim post!"
    />
  </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostsPreview.vue'

export default {
  components: {
    PostPreview,
  },
}
</script>

<style scoped>
.posts-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
