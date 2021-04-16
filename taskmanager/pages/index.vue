<template lang="pug">
  a-row
    a-col(:span="22" :offset="1")
      a-spin(v-if="loading" tip="読み込み中")
        .spin-content ローディング中
      div(v-else)
        p {{ $store.getters.getUserName }}
        button.button.is-primary.is-rounded(@click="login")
          | ログイン
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
const columns = [
  { title: 'todo', dataIndex: 'todo', key: 'todo' },
  { title: 'limit', dataIndex: 'limit', key: 'limit' },
]
export default {
  data() {
    return {
      columns,
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
  async created() {
    this.loading = true
    await this.$store.dispatch('fetchTodos')
    this.todoList = this.$store.getters.getTodos
    this.loading = false
  },
  methods: {
    login() {
      this.$store.dispatch('login')
    },
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

      this.$store.dispatch('addTodo', { todo, limit })
      this.reset()
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
