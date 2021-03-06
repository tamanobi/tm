export const state = () => ({
  todos: [],
})

export const mutations = {
  addTodo(state, todo) {
    state.todos.push(todo)
  },
  removeTodo(state, id) {
    state.todos = state.todos.filter((v) => v.id !== id)
  },
}

export const actions = {
  async fetchTodos({ commit, getters, rootGetters }) {
    const todoRef = getters['firebase/todoRef']
    const uid = rootGetters['auth/uid']
    const docs = await todoRef.where('uid', '==', uid).get()
    const todoList = []
    docs.forEach((doc) => {
      const d = { ...doc.data(), id: doc.id }
      commit('addTodo', d)
      todoList.push(d)
    })
    return todoList
  },
  addTodo({ commit, getters, rootState }, todo) {
    const todoRef = getters['firebase/todoRef']
    const uid = rootState.auth.uid
    todoRef.add({ todo: todo.todo, limit: todo.limit, uid }).then((doc) => {
      commit('addTodo', todo)
    })
  },
  removeTodo({ commit, getters }, todo) {
    const todoRef = getters['firebase/todoRef']
    todoRef
      .doc(todo.id)
      .delete()
      .then((doc) => {
        commit('removeTodo', todo.id)
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
