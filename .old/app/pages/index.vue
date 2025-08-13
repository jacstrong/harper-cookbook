<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const headers = [
  {
    text: 'Name',
    align: 'start' as 'start' | 'end' | 'center',
    value: 'name',
  },
  { text: 'By', value: 'by' },
  { text: 'Actions', value: 'actions', sortable: false },
];


const search = ref('');
const remoteSearch = ref('');
const remoteSearchItems = ref<any[]>([]);
const error = ref(false);

const { data: recipes, error: recipesError } = useFetch<any[]>('/api/recipe', {
  key: 'recipes',
  default: () => [],
  transform: (data) => Array.isArray(data) ? data : []
});

interface Tag {
  _id: string;
  name: string;
}

const { data: tags, error: tagsError } = useFetch<Tag[]>('/api/tags', {
  key: 'tags',
  default: () => [],
});

if (recipesError.value || tagsError.value) {
  error.value = true;
}

function editItem(item: any) {
  router.push(`/edit-recipe/${item._id}`);
}

function viewItem(item: any) {
  router.push(`/${item._id}`);
}


async function querySearch() {
  try {
    const result = await $fetch('/api/recipe/search', {
      params: { search: remoteSearch.value },
    });
    console.log(result);
    remoteSearchItems.value = Array.isArray(result) ? result : [];
  } catch (err) {
    console.log(err);
  }
}

function searchChange() {
  if (remoteSearch.value === '' || remoteSearch.value.length <= 2) {
    remoteSearchItems.value = [];
  }
}

watch(remoteSearch, (val) => {
  if (val && val.length > 2) {
    querySearch();
  }
});

const noResults = computed(() => {
  return remoteSearch.value.length > 2 && remoteSearchItems.value.length === 0;
});
</script>

<template>
  <div>
    <div class="search-header">
      <v-container class="pa-6">
        <v-row>
          <v-col cols="0" sm="1" md="3" />
          <v-col>
              <!-- :hide-no-data="remoteSearchItems.lenght === 0" -->
              <!-- <template v-slot:activator="{ on }"> -->
            <v-text-field
              label="Search"
              rounded
              filled
              color="primary"
              class="white searchField"
              hide-details
              v-model="remoteSearch"
              ref="searchField"
              @input="searchChange"
            ></v-text-field>
          </v-col>
          <v-col cols="0" sm="1" md="3" />
        </v-row>
      </v-container>
    </div>
    <div>
      <v-container>
        <v-row v-if="remoteSearchItems.length > 0" class="text-center">
          <v-col class="py-1">
            <strong>Search Results</strong>
          </v-col>
        </v-row>
        <v-row v-if="remoteSearchItems.length > 0">

          <v-card
            class="search-card"
            max-height="300"
            min-width="100%"
          >
            <v-list-item
              v-for="item in remoteSearchItems"
              :key="item._id"
              two-line
              @click="viewItem(item)"
              min-width="100%"
              class="text-center"
            >
              <!-- <v-list-item-content> -->
                <v-list-item-title>{{item.name}}</v-list-item-title>
                <v-list-item-subtitle>{{item.by}}</v-list-item-subtitle>
              <!-- </v-list-item-content> -->
            </v-list-item>
          </v-card>
        </v-row>
        <v-row v-if="noResults">
          <v-col class="text-center">
            <v-img src="/undraw_Chef_cu0r.svg" contain max-height="150" />
            No Results
          </v-col>
        </v-row>
        <v-row>
          <v-col class="tag-container">
            <v-chip
              v-for="tag in tags"
              :key="tag._id"
              class="mr-3"
              :to="`/category/${tag._id}`"
            >
              {{tag.name}}
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                Recipes
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="recipes"
                :search="search"
                @click:row="viewItem"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click.stop="editItem(item)"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            With the family spreading out and younger generations coming of age, we thought it was time to digitize the Harper Family Cookbook.
            We have also added the option to contribute new recipes. If you would like to contribute you must create an account.
            We will verify your account and you will be able to add any recipes you like.
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="accent" to="/newrecipe">Add Recipe</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>


<style>
.search-header {
  background-image:
    radial-gradient(circle, rgba(145,144,142,0.04813263195903361) 0%, rgba(61,78,64,1) 100%),
    url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1335&q=80);
  background-position: center;
  background-size: cover;
  padding-top: 30px;
  padding-bottom: 30px;
}

.search-card {
  overflow-x: scroll;
}

.tag-container {
  overflow: auto;
  white-space: nowrap;

}
</style>
