export const state = () => ({
  status: '',
  username: '',
  email: '',
  token: localStorage.getItem('token') || '',
})
export const mutations = {
  setUser(state, user) {
    state.status = 'loggedIn'
    console.log(user)
  },
}
export const actions = {
  gotUser({ commit }, user) {
    commit('setUser', user)
  },
}
