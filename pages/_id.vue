<template>
  <div>
    <recipe :recipe="recipe" />
  </div>
</template>

<script>
import Recipe from '~/components/Recipe'

export default {
  components: {
    Recipe
  },
  data: () => ({
    recipe: {}
  }),
  created () {
    console.log(this.$route.params)
    this.$axios.$get(`/api/recipe/${this.$route.params.id}`)
      .then(res => {
        console.log(res)
        this.recipe = res
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
