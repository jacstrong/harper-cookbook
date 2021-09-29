<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <reset-password-request />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ResetPasswordRequest from '~/components/ResetPasswordRequest'

export default {
  middleware: 'notauthenticated',
  components: {
    ResetPasswordRequest,
  },
}
</script>
