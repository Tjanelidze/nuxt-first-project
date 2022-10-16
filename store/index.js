import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
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
      setToken(state, token) {
        state.token = token
      },

      clearToken(state) {
        state.token = null
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
          process.env.baseUrl + '/posts.json?auth=' + vuexContext.state.token,
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
            '.json?auth=' +
            vuexContext.state.token,
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

      async authenticateUser(vuexContext, authData) {
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`
        if (!authData.isLogin) {
          authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`
        }

        const response = await fetch(authUrl, {
          method: 'POST',
          body: JSON.stringify({
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }),
        })
        const responseData = await response.json()
        vuexContext.commit('setToken', responseData.idToken)
        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem(
          'tokenExpiration',
          new Date().getTime() + +responseData.expiresIn * 1000
        )
        Cookie.set('jwt', responseData.idToken)
        Cookie.set(
          'expirationDate',
          new Date().getTime() + +responseData.expiresIn * 1000
        )
        console.log(responseData)
        return responseData
      },

      initAuth(vuexContext, req) {
        let token
        let expirationDate
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token')
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      },
    },
  })
}

export default createStore
