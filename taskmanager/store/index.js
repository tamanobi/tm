import firebase from '~/plugins/firebase'

export const state = () => ({})

export const mutations = {}

export const actions = {
  login() {
    console.log('login action')
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user
        console.log('success : ' + user)
      })
      .catch(function (error) {
        var errorCode = error.code
        console.log('error : ' + errorCode)
      })
  },
}

export const getters = {}
