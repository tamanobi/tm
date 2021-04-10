import firebase from 'firebase'

export const state = () => ({
  firebase: null,
})

export const mutations = {
  initData(state, instance) {
    state.firebase = instance
  },
}

export const actions = {
  async initialize({ commit }) {
    const resp = await fetch('/__/firebase/init.json')
    firebase.initializeApp(await resp.json())
    commit('initData', firebase)
  },
}

export const getters = {
  getFirebase(state) {
    return state.firebase
  },
}
