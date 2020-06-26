<template>
  <div>
    <div class="search-header">
      <v-container class="pa-6">
        <v-row>
          <v-col cols="0" sm="1" md="3" />
          <v-col>
            <v-autocomplete
              label="Search"
              rounded
              filled
              color="primary"
              class="white"
              hide-details
              :menu-props="{
                'closeOnClick': false,
                'closeOnContentClick': false,
                'disableKeys': true,
                'openOnClick': false,
                'maxHeight': 304,
                'rounded': '8px',
              }"
            ></v-autocomplete>
              <!-- v-model="value" -->
          </v-col>
          <v-col cols="0" sm="1" md="3" />
        </v-row>
      </v-container>
    </div>
    <div>
      <v-container>
        <v-row>
          <v-col>
            <v-chip
              v-for="tag in tags"
              :key="tag._id"
              class="mr-3"
            >
              {{tag.name}}
            </v-chip>
          </v-col>
        </v-row>
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
                mobile-breakpoint="420"
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
      </v-container>
    </div>
  </div>
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
    tags: [],
  }),
  async asyncData ({$axios}) {
    try {
      const recipes = $axios.$get('/api/recipe')
      const tags = $axios.$get('/api/tags')

      const values = await Promise.all([recipes, tags])
      return {recipes: values[0], tags: values[1]}
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

<style>
.search-header {
  /* background-image:
    radial-gradient(circle, rgba(145,144,142,0.04813263195903361) 0%, rgba(61,78,64,1) 100%),
    url(https://images.unsplash.com/photo-1584055482118-3f355578daef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80); */
  /* background-image:
    radial-gradient(circle, rgba(145,144,142,0.04813263195903361) 0%, rgba(61,78,64,1) 100%),
    url(https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80); */
  background-image:
    radial-gradient(circle, rgba(145,144,142,0.04813263195903361) 0%, rgba(61,78,64,1) 100%),
    url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1335&q=80);
  background-position: center;
  background-size: cover;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
