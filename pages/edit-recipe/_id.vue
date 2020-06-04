<template>
  <div>
    <EditRecipe v-if="!error" :recipe="recipe" />
    <div v-else>
      error {{errorMessage}}
    </div>
  </div>
</template>

<script>
import EditRecipe from '~/components/EditRecipe'

export default {
  middleware: 'authenticated',
  components: {
    EditRecipe
  },
  data: () => ({
    recipe: {},
    error: false,
    errorMessage: '',
  }),
  async asyncData ({params, $axios}) {
    console.log('params yo', params)

    try {
      const recipe = await $axios.$get(`/api/recipe/${params.id}`)
      return {recipe}
    } catch (error) {
      return {error: true, errorMessage: 'Unable to find that recipe'}
    }
      // .then(res => {
      //   console.log('res', res)
      //   return {recipe: res.data}
      // })
      // .catch(err => {
      //   // console.log('err', err)
      //   console.log('yo sometoiresoi vaoirseqoifwedn')
      //   return {error: true, errorMessage: err}
      // })
  }

}
</script>
