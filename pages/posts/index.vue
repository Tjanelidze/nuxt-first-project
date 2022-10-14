<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList.vue'

export default {
  components: {
    PostList,
  },
  asyncData(context, callback) {
    return new Promise().catch((e) => {
      context.error(new Error())
    })
    setTimeout(() => {
      callback(null, {
        loadedPosts: [
          {
            id: '1',
            title: 'First post',
            previewText: 'This is our first post!',
            thumbnail:
              'https://youmatter.world/app/uploads/sites/2/2019/11/tech-planet.jpg',
          },
          {
            id: '2',
            title: 'Second post',
            previewText: 'This is our second post!',
            thumbnail:
              'https://www.agilitypr.com/wp-content/uploads/2020/02/technology-1-1.jpg',
          },
        ],
      })
    }, 1500)
  },
}
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
