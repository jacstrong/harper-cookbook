<template>
  <login @loginSuccess="loginSuccess()" />
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
