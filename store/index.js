import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        console.log(state.loadedPosts)
        state.loadedPosts.push(post)
      },
      editpost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          (post) => post.id === editedPost.id
        )
        state.loadedPosts[postIndex] = editedPost
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return fetch(process.env.baseUrl + '/posts.json')
          .then((response) => response.json())
          .then((res) => {
            const postArray = []
            for (const key in res) {
              postArray.push({ ...res[key], id: key })
            }
            vuexContext.commit('setPosts', postArray)
          })
          .catch((e) => context.error(e))
      },

      addPost(vuexContext, post) {
        const createdPost = { ...post, updatedDate: new Date() }

        return fetch(
          process.env.baseUrl + '/posts.json',
          {
            method: 'POST',
            body: JSON.stringify(createdPost),
          },
          createdPost
        )
          .then((response) => response.json())
          .then((res) => {
            vuexContext.commit('addPost', {
              ...createdPost,
              id: res.name,
            })
          })
          .catch((e) => console.log(e.message))
      },
      editPost(vuexContext, editedPost) {
        return fetch(
          'https://nuxt-blog-1694c-default-rtdb.firebaseio.com/posts/' +
            editedPost.id +
            '.json',
          {
            method: 'PUT',
            body: JSON.stringify(editedPost),
          }
        )
          .then((response) => response.json())
          .then((res) => {
            vuexContext.commit('editpost', editedPost)
          })
          .catch((e) => console.log(e.message))
      },

      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
    },
  })
}

export default createStore
