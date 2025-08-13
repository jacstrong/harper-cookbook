<template>
    <v-app-bar
      color="primary"
      fixed
      app
    >
      <v-toolbar-title class="white--text" v-text="'Harper Family Cook Book'" @click="$router.push('/')"/>
      <v-spacer />

      <!-- <v-autocomplete
        v-model="search"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="Description"
        item-value="API"
        label="Public APIs"
        placeholder="Search recipes"
        prepend-icon="mdi-search"
        return-object
      ></v-autocomplete> -->

        <!-- v-if="!$store.state.auth" -->
      <v-btn
        v-if="false"
        color="accent"
        to="/login"
      >
        login
      </v-btn>

      <v-btn
        v-else
        color="accent"
        to="/profile"
      >
        <!-- {{$store.state.auth.name}} -->
        name placeholder
      </v-btn>

      <!-- <v-menu
        v-model="menu"
      >
        <v-btn
          icon
          @click.stop="menu = !menu"
          slot="activator"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title" @click="callback">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
    <v-footer
      app
    >
      <span>Made with ♥ by Jacob Strong</span>
    </v-footer>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(false);
const menu = ref(false);
const search = ref('');
</script>

<style>
.menu-background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background: transparent;
}
</style>
