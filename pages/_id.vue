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
  head () {
    return {
      title: this.recipe.name,
      meta: [
        { hid: 'description', name: 'description', content: `${this.recipe.name} by ${this.recipe.by}.` }
      ]
    }
  },
  data: () => ({
    recipe: {}
  }),
  asyncData ({$axios, params}) {
    return $axios.get(`/api/recipe/${params.id}`)
      .then(res => {
        return { recipe: res.data }
      })
      .catch(err => {
        console.log(err)
        return
      })
  },
  created () {
    // console.log(this.$route.params)
    // this.$axios.$get(`/api/recipe/${this.$route.params.id}`)
    //   .then(res => {
    //     console.log(res)
    //     this.recipe = res
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }
}
</script>
