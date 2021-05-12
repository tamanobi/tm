import Firebase from '~/infrastructure/firebase'

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
  initialize({ state, commit }) {
    if (state.ready) return

    const fb = new Firebase()
    commit('initData', fb.instance)
  },
}

export const getters = {
  getFirebase: (state) => state.firebase,
  todoRef: (state) => state.firebase.todos(),
}
