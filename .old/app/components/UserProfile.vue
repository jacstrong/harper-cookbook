<template>
  <div>
    <v-card class="mb-3">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" @click="logout">logout</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mb-3">
      <v-card-title primary-title>
        Your Information
      </v-card-title>
      <v-form>
        <v-card-text>
          <v-text-field
            :value="$store.state.auth.name"
            label="Name"
            outlined
            disabled
          ></v-text-field>
          <v-text-field
            :value="$store.state.auth.email"
            label="Email"
            outlined
            disabled
          ></v-text-field>
        </v-card-text>
      </v-form>
    </v-card>
    <v-card>
      <v-card-title primary-title>
        Change Password
      </v-card-title>
      <v-form>
        <v-card-text>
          <v-text-field
            v-model="password"
            label="Password"
            outlined
            :rules="passRules"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            outlined
            type="password"
            :error="!match"
            @keydown.enter="changePassword()"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" @click="changePassword()">update password</v-btn>
        </v-card-actions>
        <v-card-text v-if="message !== ''">
          {{message}}
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    confirmPassword: '',
    data: {},
    email: '',
    message: '',
    name: '',
    password: '',
    passRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be greater than 8 characters',
    ],
  }),
  methods: {
    changePassword () {
      if (!this.match) return
      this.$axios.$post('/api/user/changepassword', { password: this.password})
        .then(res => {
          this.message = 'Your password has been changed 😃'
        })
        .catch(err => {
          this.message = 'Something went wrong 😭'
        })
    },
    logout () {
      this.$axios.$get(`/api/user/logout`)
        .then(() => {
          this.$store.commit('logout')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.$router.push('/')
        })
    }
  },
  computed: {
    match: function () {
      return this.password === this.confirmPassword
    }
  },
  created () {
    console.log('data', this.data)
  }
}
</script>
