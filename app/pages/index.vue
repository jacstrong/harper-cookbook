<template>
  <v-container fluid>
    <v-card
      image="https://unsplash.com/photos/-YHSwy6uqvk/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Zm9vZHxlbnwwfHx8fDE3NTUwNTU4NDl8MA&force=true&w=2400"
      min-height="300px"
      rounded="xl"
    />
    <v-row>
      <v-chip-group
        class="pa-4"
        column
        show-arrows
      >
        <v-chip>Appetizers</v-chip>
        <v-chip>Main Courses</v-chip>
        <v-chip>Desserts</v-chip>
        <v-chip>Snacks</v-chip>
        <v-chip>Beverages</v-chip>
      </v-chip-group>
    </v-row>
    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="6">
        <v-text-field
          label="Search for a recipe"
          variant="outlined"
          clearable
          append-inner-icon="mdi-magnify"
          rounded="xl"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="pa-4 text-center">
          <h2>About the Harper Cookbook</h2>
          <p>
            Back in the 1968, the Harper family started compiling their favorite recipes into a single book. Over the years, it has grown into a cherished collection of family traditions and culinary delights. This digital version aims to preserve those recipes and share them with future generations.
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="recipe in recipes" :key="recipe.id" cols="12" sm="6" md="4" lg="3">
        <v-card
          class="mx-auto my-4"
          rounded="xl"
        >
          <v-img
            :src="recipe.image"
            height="200px"
            cover
          />
          <v-card-title>{{ recipe.title }}</v-card-title>
          <v-card-actions>
            <v-btn text>View Recipe</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const { data } = await useFetch('/api/test')
console.log('Data from API:', data.value)

const recipes = ref([
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: 'https://unsplash.com/photos/Yr4n8O_3UPc/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjN8fGZvb2R8ZW58MHx8fHwxNzU1MDU1ODY0fDA&force=true&w=640',
  },
  {
    id: 2,
    title: 'Chicken Tikka Masala',
    image: 'https://unsplash.com/photos/Yr4n8O_3UPc/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjN8fGZvb2R8ZW58MHx8fHwxNzU1MDU1ODY0fDA&force=true&w=640',
  },
  {
    id: 3,
    title: 'Beef Stroganoff',
    image: 'https://unsplash.com/photos/Yr4n8O_3UPc/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjN8fGZvb2R8ZW58MHx8fHwxNzU1MDU1ODY0fDA&force=true&w=640',
  },
])

</script>
