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
        <v-btn color="accent" to="/newrecipe">Add Recipe</v-btn>
      </div>
      <div v-for="recipe in recipes" :key="recipe._id">
        {{recipe.name}} {{recipe.by}} <nuxt-link :to="`/${recipe._id}`">view</nuxt-link>
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
  data: () => ({
    recipes: [],
  }),
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
  },
  created () {
    this.$axios.$get('/api/recipe')
      .then(res => {
        this.recipes = res
      })
  }
}
</script>
