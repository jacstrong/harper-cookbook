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
      <!-- <div v-for="recipe in recipes" :key="recipe._id">
        {{recipe.name}} {{recipe.by}} <nuxt-link :to="`/${recipe._id}`">view</nuxt-link>
      </div> -->
      <v-card>
      <v-card-title>
        Recipes
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="recipes"
        :search="search"
        @click:row="viewItem"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click.stop="editItem(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
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
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'By', value: 'by' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    recipes: [],
    search: '',
    error: false,
  }),
  async asyncData ({$axios}) {
    try {
      const recipes = await $axios.$get('/api/recipe')
      // console.log('fricken res', res)
      return {recipes}

    } catch (error) {
      console.log(error)
      return { error: true }
    }
  },
  methods: {
    editItem (item) {
      this.$router.push(`/edit-recipe/${item._id}`)
    },
    testUser () {
      this.$axios.$post('/api/user/changepassword', { password: 'jimmyeatworld'})
        .then(res => {
          console.log(res.body)
        })
        .catch(err => {
          console.log(err)
        })
    },
    viewItem (item) {
      this.$router.push(`/${item._id}`)
    }
  },
  // created () {
  // }
}
</script>
