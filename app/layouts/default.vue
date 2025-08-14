<template>
  <div>
    <v-app-bar
      class="bg-background"
      flat
    >
      <NuxtLink v-slot="{ href, navigate }" to="/" custom>
        <v-app-bar-title :href="href" @click="navigate">
          Harper Family Cookbook
        </v-app-bar-title>
      </NuxtLink>
      <v-spacer/>
      <NuxtLink v-slot="{ href, navigate, isActive }" to="/about" custom>
        <v-btn :href="href" :variant="isActive ? 'tonal' : 'flat'" @click="navigate">
          About
        </v-btn>
      </NuxtLink>
      <NuxtLink v-slot="{ href, navigate, isActive }" to="/recipes" custom>
        <v-btn :href="href" :variant="isActive ? 'tonal' : 'flat'" @click="navigate">
          Recipes
        </v-btn>
      </NuxtLink>
      <NuxtLink v-slot="{ href, navigate, isActive }" to="/login" custom>
        <v-btn :href="href" :variant="isActive ? 'tonal' : 'flat'" @click="navigate">
          Login
        </v-btn>
      </NuxtLink>
    </v-app-bar>
    <v-main class="bg-background" style="min-height: calc(100vh - 42px);">
      <!-- Assuming app bar height is 64px and footer height is 56px -->
      <slot />
    </v-main>
    <v-footer>
      Made with ♥ by Jacob Strong
    </v-footer>
  </div>
</template>
