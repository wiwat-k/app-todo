export const state = () => ({
    apiUrl: `https://candidate.neversitup.com/todo`,
    token: null,
  })
  
  export const mutations = {
    setToken (state, value) {
      state.token = value
    }
  }
  
  export const actions = {
    async nuxtServerInit ({ commit }) {
      if (this.$cookies.get('token')) {
        commit('setToken', this.$cookies.get('token'))
      }
    }
  }
  