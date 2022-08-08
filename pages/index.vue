<template>
  <div>
    <div class="row d-flex min-vh-100 justify-content-center align-items-center">
      <div class="col col-md-6">
        <template v-if="todoList.length === 0">
          <h1 class="text-center">Empty press "Create"<br />for add new todo</h1>
        </template>
        <template v-else>
          <TodoList
            v-for="(item,i) in todoList"
            :key="`todo-list-${i}`"
            :item="item"
            class="m-2"
          />
        </template>

        <div class="d-flex justify-content-center">
          <TodoCreate class="m-4" />
        </div>
      </div>
    </div>
    <TodoEdit :editData="editData" />
  </div>
</template>


<script>
export default {
  middleware: 'auth',
  data: () => ({
    editData: {
      modal: false,
      id: ``,
      title: ``,
      description: ``
    },
    password: '',
    todoList: [],
    firstArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    secondArray: [3, 5, 7, 9]
  }),
  methods: {
    fillterArray () {
      const newArray = this.firstArray.filter((item) => {
        return this.secondArray.includes(item)
      })
      console.log(newArray)
    },
    editTodo (item) {
      this.editData.modal = true
      this.editData.id = item._id
      this.editData.title = item.title
      this.editData.description = item.description
    },
    async getTodoList () {
      await this.$axios
        .$get(`/todos`)
        .then(response => {
          this.todoList = response
        })
        .catch(error => {
          this.$swal("", 'Someting went wrong please try agian.', 'error')
        })
        .finally(() => {

        })

    }
  },
  mounted () {
    this.getTodoList()
    this.fillterArray()
  },
}
</script>
