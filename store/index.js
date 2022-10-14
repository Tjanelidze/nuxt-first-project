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
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexContext.commit('setPosts', [
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
            ])
            resolve()
          }, 1000)
        })
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
