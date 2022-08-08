<template>
  <div class="row d-flex min-vh-100 justify-content-center align-items-center">
    <div class="col col-md-4">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input
          type="email"
          class="form-control "
          :class="[valid && username.length === 0 ? `is-invalid` : ``, valid && username.length > 0 ? `is-valid` : ``]"
          placeholder=""
          v-model="username"
          required
        >
        <div
          class="invalid-feedback"
          v-if="valid && username.length === 0"
        >
          This field is required!
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          placeholder=""
          :class="[valid && password.length === 0 ? `is-invalid` : ``, valid && password.length > 0 ? `is-valid` : ``]"
          v-model="password"
        >
        <div
          class="invalid-feedback"
          v-if="valid && password.length === 0"
        >
          This field is required!
        </div>
      </div>
      <div class="mb-3 d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-primary"
          @click="btnLogin()"
        >Login</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'login',
  layout: 'login',
  data: () => ({
    valid: false,
    username: '',
    password: ''
  }),
  methods: {
    async btnLogin () {
      this.valid = false
      if (this.username.length === 0) {
        this.valid = true
        return
      }
      if (this.password.length === 0) {
        this.valid = true
        return
      }
      const form = {
        username: this.username,
        password: this.password
      }
      await this.$axios
        .$post(`/users/auth`, form, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response.token) {
            this.$cookies.set('token', response.token, {
              path: '/',
              maxAge: 60 * 60 * 24
            })
            this.$store.commit('setToken', this.$cookies.get('token'))
            this.$router.push({ name: 'index' })
            this.$swal("", 'Login Success!', 'success')
          } else {
            this.$swal("", 'Someting went wrong please try agian.', 'error')
          }
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
