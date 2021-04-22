export const state = () => ({
  todos: [],
})

export const mutations = {
  addTodo(state, todo) {
    state.todos.push(todo)
  },
}

export const actions = {
  async fetchTodos({ commit, getters }) {
    const todoRef = getters['firebase/todoRef']
    const docs = await todoRef.get()
    docs.forEach((doc) => {
      commit('addTodo', { ...doc.data(), id: doc.id })
    })
  },
  addTodo({ commit, getters, rootState }, todo) {
    const todoRef = getters['firebase/todoRef']
    const uid = rootState.auth.uid
    todoRef.add({ todo: todo.todo, limit: todo.limit, uid }).then((doc) => {
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
