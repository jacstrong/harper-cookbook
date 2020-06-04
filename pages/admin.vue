<template>
  <div>
    {{message}}
    <div v-for="user in users" :key="user._id">
      {{user}}
      <v-btn small color="accent" @click="make(user, 'user')">make 'user'</v-btn>
      <v-btn small color="accent" @click="make(user, 'admin')">make 'admin'</v-btn>
      <v-btn small color="accent" @click="make(user, 'superadmin')">make 'superadmin'</v-btn>
      <v-btn small color="accent" :to="`/admin/useredit/${user._id}`">edit</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'issuperadmin',
  data: () => ({
    users: [],
    message: ''
  }),
  asyncData ({$axios}) {
    return $axios.get('/api/user/allusers')
      .then(res => {
        return { users: res.data }
      })
      .catch(err => {
        console.log(err)
        return
      })
  },
  methods: {
    make (user, role) {
      this.$axios.put(`/api/user/adminupdate/${user._id}`, {role})
        .then(res => {
          this.$axios.get('api/user/allusers')
            .then(res => {
              this.users = res.data
            })
            .catch(err => {
              console.log(err)
            })
          this.message = 'Done'
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
}
</script>
