<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="display-1">
          Name
        </v-col>
        <v-col class="display-1">
          By
        </v-col>
      </v-row>
      <v-row
        v-for="(recipe, i) in recipes"
        :key="recipe._id"
        :class="`${i % 2 === 0 ? 'light-green ligthen-5' : ''}`"
        @click="navToRecipe(recipe)"
        class="recipe-row"
      >
        <v-col>
          {{recipe.name}}
        </v-col>
        <v-col>
          {{recipe.by}}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    recipes: []
  }),
  async asyncData ({$axios, params}) {
    try {
      const recipes = await $axios.$get(`/api/recipe/category/${params.id}`)
      return { recipes }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    navToRecipe(recipe) {
      this.$router.push(`/${recipe._id}`)
    }
  }
}
</script>

<style scoped>
.recipe-row {
  cursor: pointer;
}
</style>
