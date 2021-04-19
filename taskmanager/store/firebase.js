import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// ref: https://firebase.google.com/docs/web/setup?hl=ja#add-sdks-initialize

export const state = () => ({
  firebase: null,
  ready: false,
})

export const mutations = {
  initData(state, instance) {
    state.firebase = instance
  },
}

export const actions = {
  async initialize({ state, commit }) {
    if (state.ready) return

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
