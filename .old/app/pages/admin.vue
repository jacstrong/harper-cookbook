<template>
  <v-content>
    {{message}}
    <v-row>
      <v-col class="title">
        Need to be approved
        <hr>
      </v-col>
    </v-row>
    <v-row v-for="user in notActiveUsers" :key="user._id">
      <v-col>
        {{user.name}}
      </v-col>
      <v-col>
        {{user.email}}
      </v-col>
      <v-col>
        {{user.relation}}
      </v-col>
      <!-- {{user}} -->
      <v-col>
        <v-btn small color="accent" @click="activate(user, true)">Activate</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span v-if="notActiveUsers.length === 0">Nobody is waiting to be approved.</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="title">
        Active Users
        <hr>
      </v-col>
    </v-row>
    <v-row v-for="user in activeUsers" :key="user._id">
      <v-col cols="6" sm="4">
        {{user.name}}
      </v-col>
      <v-col cols="6" sm="4">
        {{user.email}}
      </v-col>
      <v-col cols="6" sm="4">
        {{user.relation}}
      </v-col>
      <v-col cols="6" sm="4">
        {{user.role}}
      </v-col>
      <!-- {{user}} -->
      <v-col cols="6" sm="4">
        <v-select
          :items="items"
          v-model="user.role"
          label="Role"
          outlined
          @change="make(user, $event)"
        ></v-select>
      </v-col>
      <v-col cols="6" sm="4">
        <v-btn small color="accent" @click="activate(user, false)">Deactivate</v-btn>
        <!-- <v-btn small color="accent" @click="make(user, 'user')">make 'user'</v-btn>
        <v-btn small color="accent" @click="make(user, 'admin')">make 'admin'</v-btn>
        <v-btn small color="accent" @click="make(user, 'superadmin')">make 'superadmin'</v-btn> -->
        <v-btn small color="accent" :to="`/admin/useredit/${user._id}`">edit</v-btn>
      </v-col>
      <v-col cols="12">
        <hr>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  middleware: 'issuperadmin',
  head: () => ({
    title: 'Admin'
  }),
  data: () => ({
    users: [],
    message: '',
    items: [ 'user', 'admin', 'superadmin' ]
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
    activate (user, active) {
      this.$axios.put(`/api/user/adminupdate/${user._id}`, {active})
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
    },
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
    },
  },
  computed: {
    activeUsers () {
      let active = []
      this.users.forEach(element => {
        if (element.active) {
          active.push(element)
        }
      })
      return active
    },
    notActiveUsers () {
      let notActive = []
      this.users.forEach(element => {
        if (!element.active) {
          notActive.push(element)
        }
      })
      return notActive
    }
  }
}
</script>

<style scoped>
hr {
  color: darkgreen;
}
</style>
