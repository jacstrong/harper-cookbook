<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <login @loginSuccess="loginSuccess()" />
        <v-card-text>
          <NuxtLink to="/password-reset">Forgot Password?</NuxtLink>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from '~/components/Login'

export default {
  middleware: 'notauthenticated',
  components: {
    Login,
  },
  methods: {
    loginSuccess () {
      this.$router.push('/')
    }
  },
}
</script>
