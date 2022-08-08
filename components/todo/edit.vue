<template>
  <div>
    <b-modal
      id="modal-center"
      centered
      title="Edit"
      :hide-footer="true"
      v-model="editData.modal"
    >
      <div class="row">
        <div class="col">
          <b-form-group
            label="Title"
            :invalid-feedback="!valid ? null : titleValidFeedBack"
            :state="!valid ? null : titleValid"
          >
            <b-form-input
              v-model="editData.title"
              type="text"
              :state="!valid ? null : titleValid"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <b-form-group
            label="Description"
            :invalid-feedback="!valid ? null : descriptionValidFeedBack"
            :state="!valid ? null : descriptionValid"
          >
            <b-form-textarea
              v-model="editData.description"
              type="text"
              :state="!valid ? null : descriptionValid"
              rows="5"
            ></b-form-textarea>
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <b-button
            variant="light"
            class="m-2"
            @click="createModal = false"
          >Cancel</b-button>
          <b-button
            class="m-2"
            variant="primary"
            @click="btnEdit()"
          >Edit</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>


<script>
export default {
  props: ['editData'],
  data: () => ({
    valid: false,
  }),
  computed: {
    titleValid () {
      return this.editData.title.length > 0
    },
    titleValidFeedBack () {
      return this.editData.title.length > 0 ? `` : `This field is required!`
    },
    descriptionValid () {
      return this.editData.description.length > 0
    },
    descriptionValidFeedBack () {
      return this.editData.description.length > 0 ? `` : `This field is required!`
    },
  },
  methods: {
    async btnEdit () {
      this.valid = false
      if (this.editData.title.length === 0) {
        this.valid = true
        return
      }
      if (this.editData.description.length === 0) {
        this.valid = true
        return
      }
      const form = {
        title: this.editData.title,
        description: this.editData.description
      }
      await this.$axios
        .$put(`/todos/${this.editData.id}`, form, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.editData.title = ''
          this.editData.description = ''
          this.$parent.getTodoList();
          this.editData.modal = false
        })
        .catch(error => {
          this.$swal("", 'Someting went wrong please try agian.', 'error')
        })
        .finally(() => {
        })
    }
  },
  mounted () {
  },
}
</script>
