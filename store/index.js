import Vuex from 'vuex'
// import ('axios')

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return fetch(
          'https://nuxt-blog-1694c-default-rtdb.firebaseio.com/posts.json'
        )
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
