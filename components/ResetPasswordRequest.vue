<template>
  <div>
    <v-card>
      <v-form ref="form">
        <v-card-text>
          Please enter your email to reset your password.
        </v-card-text>
        <v-card-text>
          <v-text-field
            v-model="email"
            label="Email"
            :error="error"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded color="accent" @click="login()">submit</v-btn>
        </v-card-actions>
      </v-form>
      <v-card-text v-if="success">
        A password reset request has been sent to your email.
      </v-card-text>
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
    success: false,
    emailRules: [
      v => !!v || 'E-mail is required',
    ],
  }),
  methods: {
    login () {
      if (!this.$refs.form.validate()) {
        return
      } else {
        this.$axios.$post('api/password-reset', { email: this.email })
          .then(res => {
            this.success = true
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
