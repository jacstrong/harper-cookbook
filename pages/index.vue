<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        Welcome to the harper cookbook
        <v-btn color="success" @click="testUser()">Test user</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Login from '~/components/Login.vue'

export default {
  components: {
    Login,
  },
  methods: {
    testUser () {
      this.$axios.$post('/api/user/changepassword', { password: 'jimmyeatworld'})
        .then(res => {
          console.log(res.body)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
