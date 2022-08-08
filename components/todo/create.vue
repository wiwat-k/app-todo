<template>
  <div>
    <b-button
      @click="openCreateModal()"
      variant="primary"
    ><i class="fa fa-plus"></i> Create</b-button>

    <b-modal
      id="modal-center"
      centered
      title="Create"
      :hide-footer="true"
      v-model="createModal"
    >
      <div class="row">
        <div class="col">
          <b-form-group
            label="Title"
            :invalid-feedback="!valid ? null : titleValidFeedBack"
            :state="!valid ? null : titleValid"
          >
            <b-form-input
              v-model="title"
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
              v-model="description"
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
            variant="primary"
            class="m-2"
            @click="btnCreate()"
          >Create</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>


<script>
export default {
  data: () => ({
    valid: false,
    title: '',
    description: '',
    createModal: false
  }),
  computed: {
    titleValid () {
      return this.title.length > 0
    },
    titleValidFeedBack () {
      return this.title.length > 0 ? `` : `This field is required!`
    },
    descriptionValid () {
      return this.description.length > 0
    },
    descriptionValidFeedBack () {
      return this.description.length > 0 ? `` : `This field is required!`
    },
  },
  methods: {
    openCreateModal() {
        this.valid = false
        this.title = ``
        this.description = ``
        this.createModal = true
    },
    async btnCreate () {
      this.valid = false
      if (this.title.length === 0) {
        this.valid = true
        return
      }
      if (this.description.length === 0) {
        this.valid = true
        return
      }
      const form = {
        title: this.title,
        description: this.description
      }
      await this.$axios
        .$post(`/todos`, form, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.title = ''
          this.description = ''
          this.$parent.getTodoList();
          this.createModal = false
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
