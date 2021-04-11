<template lang="pug">
  a-row
    a-col(:span="12")
      a-spin(v-if="loading" tip="読み込み中")
        .spin-content ローディング中
      div(v-else)
        p {{ $store.getters.getUserName }}
        button.button.is-primary.is-rounded(@click="login")
          | ログイン
        table
          thead
            tr
              th todo
              th limit
          tbody
            tr(v-for="todo in $store.getters['getTodos']" :key="todo.todo")
              td {{ todo.todo }}
              td {{ todo.limit }}

        a-form-model(
          :model="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        )
          a-form-model-item(label="TODO")
            a-input(v-model="form.todo")
          a-form-model-item(label="LIMIT")
            a-input(v-model="form.limit")
        a-button(type="primary" @click="addTodo") add
        a-button(type="dashed" @click="clearTodo") clear
</template>

<script>
export default {
  data() {
    return {
      form: {
        todo: '',
        limit: '',
      },
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

      this.$store.dispatch('addTodo', { todo, limit })
      this.reset()
    },
    clearTodo() {
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
