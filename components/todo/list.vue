<template>
  <div class="card-todo">
    <button
      type="button"
      class="btn btn-white btn-delete"
      @click.prevent="btnDelete(item)"
    ><i class="fa fa-times text-muted"></i></button>
    <b-card
      :title="item.title"
      class=""
      @click="$parent.editTodo(item)"
    >
      <b-card-text>
        {{ item.description }}
      </b-card-text>
      <div class="text-right text-muted">{{ $formatDate(item.createdAt) }}</div>
    </b-card>
  </div>
</template>


<script>
export default {
  props: ['item'],
  methods: {
    async btnDelete (item) {
      this.$swal({
        title: ``,
        text: `Want to delete ${item.title}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        reverseButtons: true,
        customClass: {
          cancelButton: 'btn btn-light m-2',
          confirmButton: 'btn btn-primary m-2',
        },
        buttonsStyling: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteTodo(item._id)
        }
      })
    },
    async deleteTodo (id) {
      await this.$axios
        .$delete(`/todos/${id}`)
        .then(response => {
          this.$parent.getTodoList();
        })
        .catch(error => {
          this.$swal("", 'Someting went wrong please try agian.', 'error')
        })
        .finally(() => {
        })
    }
  }
}
</script>

<style scoped>
.card-todo {
  position: relative;
  transition: 0.3s;
  cursor: pointer;
}
.card-todo:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}
.btn-delete {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
}
</style>
