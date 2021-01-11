<template>
  <v-card>
    <v-card-title primary-title>
      Users
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.name"
            >
              <td>{{ user.name }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    users: [],
    message: '',
    items: [ 'user', 'admin', 'superadmin' ]
  }),
  asyncData ({$axios}) {
    console.log('yo wassup')
    return $axios.get('/api/users/allusers')
      .then(res => {
        console.log(res)
        return { users: res.data }
      })
      .catch(err => {
        console.log(err)
        return
      })
  },
  created () {
    this.$axios.get('/api/users/allusers')
      .then(res => {
        console.log(res)
        this.users= res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
