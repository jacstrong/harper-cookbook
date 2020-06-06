<template>
  <v-content class="pt-3">
    <v-row>
      <v-col>
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
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        With the family spreading out and younger generations coming of age, we thought it was time to digitize the Harper Family Cookbook.
        We have also added the option to contribute new recipes. If you would like to contribute you must create an account.
        We will verify your account and you will be able to add any recipes you like.
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="accent" to="/newrecipe">Add Recipe</v-btn>
      </v-col>
    </v-row>
  </v-content>
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
    viewItem (item) {
      this.$router.push(`/${item._id}`)
    }
  },
  // created () {
  // }
}
</script>
