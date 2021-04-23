<template lang="pug">
  a-row
    a-col(:span="18" :offset="3")
      a-spin(v-if="loading" tip="読み込み中")
        .spin-content ローディング中
      div(v-else)
        div(v-if="isLoggedIn")
          p {{ uid }}
          p {{ username }}
          a-button(type="secondary" @click="logout") ログアウト
        a-button(type="primary" @click="fetchTodos") ロード
        a-button(v-if="!isLoggedIn" type="primary" @click="login") ログイン
        a-table(:columns="columns" :data-source="todoList" size="small")
          a(slot="name" slot-scope="todo") {{ todo }}

        a-form-model(
          :model="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        )
          a-form-model-item(label="TODO")
            a-input(v-model="form.todo" allow-clear)
          a-form-model-item(label="LIMIT")
            a-input(v-model="form.limit" allow-clear)
        a-button(type="primary" @click="addTodo") add
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

const columns = [
  { title: 'todo', dataIndex: 'todo', key: 'todo' },
  { title: 'limit', dataIndex: 'limit', key: 'limit' },
]
export default {
  data() {
    return {
      columns,
      user: null,
      form: {
        todo: '',
        limit: '',
      },
      todoList: [],
      loading: true,
    }
  },
  watch: {
    loading() {
      return this.isLoading
    },
  },
  computed: {
    ...mapGetters(['getUserName', 'getTodos']),
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('auth', ['uid', 'username']),
  },
  async fetch() {
    await this.refetch()
  },
  created() {
    this.$store.watch(
      (state, getters) => getters['auth/uid'],
      async (_newValue, _oldValue) => {
        await this.refetch()
      }
    )
  },
  methods: {
    ...mapActions({
      fetchTodos: 'fetchTodos',
      addTodoAction: 'addTodo',
      login: 'auth/login',
      logout: 'auth/logout',
      log: 'auth/log',
      currentUser: 'auth/currentUser',
    }),
    reset() {
      this.form = {
        todo: '',
        limit: '',
      }
    },
    addTodo() {
      const { todo, limit } = this.form

      if (todo === '' || limit === '') {
        this.$notification.open({
          message: '入力エラー',
          description: '空文字列は入れられません',
        })
        return
      }

      this.addTodoAction({ todo, limit })
      this.reset()
    },
    async refetch() {
      this.loading = true
      this.todoList = await this.fetchTodos()
      this.loading = false
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>
