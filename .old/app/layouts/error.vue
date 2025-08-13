<template>
  <v-app dark>
    <h1 v-if="error?.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '#imports'
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError | null
}>()

const pageNotFound = '404 Not Found'
const otherError = 'An error occurred'

const title = computed(() => props.error?.statusCode === 404 ? pageNotFound : otherError)

useHead({ title })
</script>


<style scoped>
h1 {
  font-size: 20px;
}
</style>
