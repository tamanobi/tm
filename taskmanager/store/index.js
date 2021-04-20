export const state = () => ({
  userUid: '',
  userName: '',
  todos: [],
})

export const mutations = {
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  addTodo(state, todo) {
    state.todos.push(todo)
  },
}

export const actions = {
  login({ commit, getters }) {
    const firebase = getters['firebase/getFirebase']
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user
        commit('setUserUid', user.uid)
        commit('setUserName', user.displayName)
      })
      .catch(function (error) {
        const errorCode = error.code
        console.error('error', errorCode)
      })
  },
  async fetchTodos({ commit, getters }) {
    const todoRef = getters['firebase/getFirebase']
      .firestore()
      .collection('todos')
    const docs = await todoRef.get()
    docs.forEach((doc) => {
      commit('addTodo', doc.data())
    })
  },
  addTodo({ commit, getters }, todo) {
    const todoRef = getters['firebase/getFirebase']
      .firestore()
      .collection('todos')
    todoRef.add({ todo: todo.todo, limit: todo.limit }).then((doc) => {
      commit('addTodo', todo)
    })
  },
}

export const getters = {
  getUserUid(state) {
    return state.userUid
  },
  getUserName(state) {
    return state.userName
  },
  getTodos(state) {
    return state.todos
  },
}
