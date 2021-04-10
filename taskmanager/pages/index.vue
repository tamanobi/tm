<template>
  <div class="container">
    <p>{{ $store.getters.getUserName }}</p>
    <button class="button is-primary is-rounded" @click="login">
      ログイン
    </button>

    <table class="table is-narrow">
      <thead>
        <tr>
          <th>todo</th>
          <th>limit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in $store.getters.getTodos" :key="todo.todo">
          <td>{{ todo.todo }}</td>
          <td>{{ todo.limit }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  methods: {
    created() {
      this.$store.dispatch('fetchTodos')
    },
    login() {
      console.log('login')
      this.$store.dispatch('login')
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
</style>
