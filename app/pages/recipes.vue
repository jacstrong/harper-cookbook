<template>
  <v-container>
    <h1>Recipes</h1>
    <v-container>
      <v-row>
        <v-col v-for="recipe in recipes" :key="recipe.id" cols="12" md="4">
          <v-card>
            <v-card-title>{{ recipe.title }}</v-card-title>
            <v-card-text>{{ recipe.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const recipes = ref([
  { id: 1, title: 'Spaghetti Bolognese', description: 'A classic Italian pasta dish.' },
  { id: 2, title: 'Chicken Curry', description: 'A spicy and flavorful dish.' },
  { id: 3, title: 'Vegetable Stir Fry', description: 'A quick and healthy meal.' },
])
</script>
