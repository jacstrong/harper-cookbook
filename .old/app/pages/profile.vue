<template>
  <div>
    <UserProfile />
  </div>
</template>

<script>
import UserProfile from '~/components/UserProfile'

export default {
  middleware: 'authenticated',
  components: {
    UserProfile
  }
}
</script>
