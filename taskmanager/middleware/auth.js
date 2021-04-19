import '~/plugins/init'

export default function ({ store }) {
  const { getters, dispatch } = store
  const firebase = getters['firebase/getFirebase']
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('gotUser')
      dispatch('auth/gotUser', user)
    }
  })
  console.log('gotUser')
}
