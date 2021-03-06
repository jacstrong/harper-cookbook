import jwt from 'jsonwebtoken'

export const state = () => ({
  auth: null,
})

export const mutations = {
  increment (state, name) {
    state.name = name
  },
  setAuth (state, auth) {
    state.auth = auth
  },
  setAuthFromJWT (state, token) {
    state.auth = jwt.decode(token)
  },
  logout (state) {
    state.auth = null
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let auth = null
    console.log('req.user', req.user)
    if (req.user) {
      auth = req.user
    }
    commit('setAuth', auth)
  },
}
