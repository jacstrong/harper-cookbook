<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <EditRecipe />
        </v-col>
      </v-row>
    </v-container>
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

  })
}
</script>
