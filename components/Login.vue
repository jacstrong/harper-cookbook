<template>
  <div>
    <v-card>
      <v-form ref="form">
        <v-card-text>
          <v-text-field
            v-model="email"
            label="Email"
            :error="error"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :error="error"
            :error-messages="errorMessage"
            @keydown.enter="login()"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded color="accent" @click="login()">login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    error: false,
    errorMessage: '',
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'E-mail is required',
    ],
    passRules: [
      v => !!v || 'Password is required',
    ],
  }),
  methods: {
    login () {
      if (!this.$refs.form.validate()) {
        return
      } else {
        this.$axios.post('api/user/login', {email: this.email, password: this.password})
          .then(res => {
            console.log(res.data)
            console.log(res.data)
            this.$emit('loginSuccess')
          })
          .catch(err => {
            if (err.response) {
              this.errorMessage = err.response.data.error.message
            } else {
              this.errorMessage = 'Something went wrong'
            }
            this.error = true
          })
      }
    }
  }
}
</script>
