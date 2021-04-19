import '~/plugins/init'

export default function ({ store }) {
  const { getters, dispatch } = store
  const firebase = getters['firebase/getFirebase']
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch('auth/gotUser', user)
    }
  })
}
