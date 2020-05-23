<template>
  <v-card>
    <v-form ref="form" lazy-validation>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Name"
          outlined
          counter="40"
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="relation"
          hint="Please tell us how you are part of the family 😊"
          label="Relation"
          counter="240"
          outlined
          :rules="relationRules"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          outlined
          :rules="emailRules"
        ></v-text-field>
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
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="createAccount()">Create Account</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    relation: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 40) || 'Name must be less than 40 characters',
    ],
    relationRules: [
      v => !!v || 'Relation is required',
      v => (v && v.length <= 240) || 'Relation description must be less than 240 characters',
    ],
    passRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be greater than 8 characters',
    ],
    // valid: false,
  }),
  methods: {
    createAccount () {

      if (!this.$refs.form.validate() || !this.match) {
        console.log('error', this.match, this.$refs.form.validate())
        return
      } else {
        this.$axios.$post('api/user/', {
          name: this.name,
          relation: this.relation,
          email: this.email,
          password: this.password,
        }).then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  computed: {
    match: function () {
      return this.password === this.confirmPassword
    }
  }
}
</script>
