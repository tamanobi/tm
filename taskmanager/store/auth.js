export const state = () => ({
  status: '',
  uid: '',
  username: '',
  email: '',
  token: localStorage.getItem('token') || '',
})
export const mutations = {
  setUser(state, user) {
    state.status = 'loggedIn'
    state.username = user.displayName
    state.email = user.email
    state.uid = user.uid
  },
}
export const actions = {
  gotUser({ commit }, user) {
    commit('setUser', user)
  },
}
