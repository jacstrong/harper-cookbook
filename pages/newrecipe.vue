<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <NewRecipe />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NewRecipe from '~/components/NewRecipe'

export default {
  middleware: 'authenticated',
  components: {
    NewRecipe
  },
  data: () => ({

  })
}
</script>
