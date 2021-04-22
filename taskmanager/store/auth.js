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
  logoutUser(state) {
    state.status = ''
    state.username = ''
    state.email = ''
    state.uid = ''
  },
}
export const actions = {
  gotUser({ commit }, user) {
    commit('setUser', user)
  },
  login({ commit, rootGetters }) {
    const firebase = rootGetters['firebase/getFirebase']
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user
        commit('setUser', user)
      })
      .catch(function (error) {
        const errorCode = error.code
        console.error('error', errorCode)
      })
  },
  logout({ commit, rootGetters }) {
    const firebase = rootGetters['firebase/getFirebase']
    console.log('firebase', firebase)
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('logoutUser')
      })
  },
}
export const getters = {
  isLoggedIn: (state) => {
    return state.status === 'loggedIn'
  },
}