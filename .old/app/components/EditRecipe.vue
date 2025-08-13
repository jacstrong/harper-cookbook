<template>
  <v-card>
    <v-form ref="form" v-model="valid">
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <span class="display-1">New Recipe</span>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          v-if="$store.state.auth.role === 'admin' || $store.state.auth.role === 'superadmin'"
        >
          <v-select
            :items="versions"
            v-model="version"
            label="Version"
            outlined
            dense
            hide-details
            :rules="required"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="8">
          <v-text-field
            label="Name"
            v-model="name"
            outlined
            dense
            hide-details
            :rules="required"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            label="By"
            v-model="by"
            outlined
            dense
            hide-details
            :rules="required"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-autocomplete
            label="Tags"
            :items="tagsServer"
            item-text="name"
            item-value="_id"
            v-model="tags"
            :search-input.sync="tagSearch"
            :hide-no-data="tagSearch && tagSearch.length < 2"
            outlined
            append-icon
            hide-details
            dense
            chips
            small-chips
            multiple
            deletable-chips
            auto-select-first
            :rules="required"
            required
            @change="tagSearch = ''"
          >
            <template v-if="tagSearch && tagSearch.length > 2" v-slot:no-data>
              <v-list-item @click="addTag()">
                <v-list-item-icon>
                  <v-icon>mdi-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Add tag: {{tagSearch}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12">
          <span class="display-1">Ingredients</span>
        </v-col>
        <v-col cols="12" class="py-0">
          <hr>
        </v-col>
      </v-row>
      <v-row
        v-for="(ingredient, i) in ingredients"
        :key="ingredient._id ? ingredient._id : ingredient.key"
      >
        <v-col cols="6" sm="2">
          <v-text-field
            label="amount"
            v-model="ingredient.amount"
            outlined
            dense
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="2">
          <v-text-field
            label="Measurement"
            v-model="ingredient.type"
            outlined
            dense
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="8">
          <v-text-field
            label="Ingredient"
            v-model="ingredient.ingredient"
            outlined
            dense
            hide-details
            :append-outer-icon="i !== 0 ? `mdi-delete` : ``"
            @click:append-outer="removeIngredient(i)"
            @keydown.enter="addIngredient()"
            :rules="required"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0">
          <hr>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="auto"
          class="mr-auto"
        />
        <v-col cols="auto">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" @click="addIngredient()">add ingredient</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span class="display-1">Directions</span>
        </v-col>
      </v-row>
      <v-row
        v-for="(direction, i) in directions"
        :key="direction._id ? direction._id : direction.key"
      >
        <v-col cols="12">
          <v-textarea
            :label="`Step ${i + 1}`"
            v-model="direction.text"
            outlined
            dense
            hide-details
            :rules="required"
            required
            auto-grow
            rows="3"
            :append-outer-icon="i !== 0 ? `mdi-delete` : ``"
            @click:append-outer="removeDirection(i)"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="auto"
          class="mr-auto"
        />
        <v-col cols="auto">
          <v-btn color="accent" @click="addDirection()">add direction</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-switch label="Sub Recipe" v-model="sub"></v-switch>
        </v-col>
      </v-row>

      <div v-if="sub">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12" md="8">
              <v-text-field
                label="Sub Recipe Name"
                v-model="subName"
                outlined
                dense
                hide-details
                :rules="required"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <span class="display-1">Ingredients</span>
            </v-col>
            <v-col cols="12" class="py-0">
              <hr>
            </v-col>
          </v-row>
          <v-row
            v-for="(ingredient, i) in subIngredients"
            :key="ingredient._id ? ingredient._id : ingredient.key"
          >
            <v-col cols="6" sm="2">
              <v-text-field
                label="amount"
                v-model="ingredient.amount"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="2">
              <v-text-field
                label="Measurement"
                v-model="ingredient.type"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8">
              <v-text-field
                label="Ingredient"
                v-model="ingredient.ingredient"
                outlined
                dense
                hide-details
                :append-outer-icon="i !== 0 ? `mdi-delete` : ``"
                @click:append-outer="removeSubIngredient(i)"
                @keydown.enter="addSubIngredient()"
                :rules="required"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <hr>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="auto"
              class="mr-auto"
            />
            <v-col cols="auto">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="accent" @click="addSubIngredient()">add ingredient</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span class="display-1">Directions</span>
            </v-col>
          </v-row>
          <v-row
            v-for="(direction, i) in subDirections"
            :key="direction._id ? direction._id : direction.key"
          >
            <v-col cols="12">
              <v-textarea
                :label="`Step ${i + 1}`"
                v-model="direction.text"
                outlined
                dense
                hide-details
                :rules="required"
                required
                auto-grow
                rows="3"
                :append-outer-icon="i !== 0 ? `mdi-delete` : ``"
                @click:append-outer="removeSubDirection(i)"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="auto"
              class="mr-auto"
            />
            <v-col cols="auto">
              <v-btn color="accent" @click="addSubDirection()">add direction</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      </div>

      <v-row>
        <v-col cols="12">
          <span class="display-1">Notes</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col id="editor">
          <!-- <ClientOnly> -->
            <!-- <quill-editor
              ref="editor"
              v-model="notes"
              :options="editorOption"
            /> -->
              <!-- @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)" -->
          <!-- </ClientOnly> -->
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-dialog
        v-model="preview"
        width="600"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            v-on="on"
          >
            Preview
          </v-btn>
        </template>

        <v-card>
          <Recipe :recipe="recipePreview" />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="preview = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn
        v-if="id === ''"
        color="accent"
        @click="submitRecipe()"
        :disabled="!valid || directions === ''"
      >
        Submit
      </v-btn>
      <v-btn
        v-else
        color="accent"
        @click="saveRecipe()"
        :disabled="!valid || directions === ''"
      >
        Save Changes
      </v-btn>
    </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { v1 as uuidv1 } from 'uuid'
import Recipe from '~/components/Recipe'

export default {
  props: [
    'recipe'
  ],
  components: {
    Recipe
  },
  data: () => ({
    by: '',
    directions: [{text: ''}],
    subDirections: [{text: ''}],
    editorOption: {
      // Some Quill options...
      theme: 'snow',
      placeholder: 'Write the notes here...',
      modules: {
        toolbar: [
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'align': [] }],
          ['link'],
          // ['link', 'image'],
        ]
      },
      scrollingContainer: '#editor',
    },
    id: '',
    ingredients: [{
      amount: '',
      ingredient: '',
      type: '',
      key: ''
    }],
    subIngredients: [{
      amount: '',
      ingredient: '',
      type: '',
      key: ''
    }],
    name: '',
    subName: '',
    notes: '',
    preview: false,
    required: [
      v => !!v || 'required',
    ],
    sub: false,
    tags: [],
    tagSearch: '',
    tagsServer: [],
    tagsLoading: false,
    version: '',
    versions: [
      'original',
      'new',
    ],
    valid: true,
  }),
  methods: {
    addIngredient () {
      this.ingredients.push({
        amount: '',
        ingredient: '',
        type: '',
        key: uuidv1()
      })
    },
    addSubIngredient () {
      this.subIngredients.push({
        amount: '',
        ingredient: '',
        type: '',
        key: uuidv1()
      })
    },
    addDirection () {
      this.directions.push({
        text: '',
        key: uuidv1()
      })
    },
    addSubDirection () {
      this.subDirections.push({
        text: '',
        key: uuidv1()
      })
    },
    addTag () {
      this.$axios.$post('/api/tags', {name: this.tagSearch})
        .then(res => {
          this.tagsServer = res
          this.tagSearch = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    getTags () {
      this.$axios.$get('/api/tags')
        .then(res => {
          this.tagsServer = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeDirection (i) {
      this.directions.splice(i, 1)
    },
    removeSubDirection (i) {
      this.subDirections.splice(i, 1)
    },
    removeIngredient (i) {
      this.ingredients.splice(i, 1)
    },
    removeSubIngredient (i) {
      this.subIngredients.splice(i, 1)
    },
    submitRecipe () {
      let data = {
        ingredients: this.ingredients,
        name: this.name,
        by: this.by,
        version: this.version,
        tags: this.tags,
        directions: this.directions,
        notes: this.notes,
      }

      if (this.sub) {
        data.subRecipe = {
          ingredients: this.subIngredients,
          directions: this.subDirections,
          name: this.subName
        }
      }

      this.$axios.$post('/api/recipe', data)
        .then(() => {
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    saveRecipe () {
      let data = {
        ingredients: this.ingredients,
        name: this.name,
        by: this.by,
        version: this.version,
        tags: this.tags,
        directions: this.directions,
        notes: this.notes,
      }
      this.$axios.$put(`/api/recipe/${this.id}`, data)
        .then(() => {
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setRecipe () {
      this.ingredients = this.recipe.ingredients
      this.directions = this.recipe.directions
      this.by = this.recipe.by
      this.version = this.recipe.version
      this.tags = this.recipe.tags
      this.notes = this.recipe.notes
      this.name = this.recipe.name
      this.id = this.recipe._id

      if (this.recipe.subRecipe) {
        this.sub = true
        this.subIngredients = this.recipe.subRecipe.ingredients,
        this.subDirections = this.recipe.subRecipe.directions,
        this.subName = this.recipe.subRecipe.name
      }
    }
  },
  created () {
    this.getTags()
    if (this.$store.state.auth.role === 'user') this.version = 'new'
    this.ingredients[0].key = uuidv1()
    this.subIngredients[0].key = uuidv1()
    this.directions[0].key = uuidv1()
    this.subDirections[0].key = uuidv1()
    console.log('val', this.recipe)

    if (this.recipe) this.setRecipe()
  },
  computed: {
    recipePreview () {
      return {
        ingredients: this.ingredients,
        directions: this.directions,
        by: this.by,
        version: this.version,
        tags: this.tags,
        notes: this.notes,
        name: this.name,
        subRecipe: this.sub ? {
          name: this.subName,
          ingredient: this.subIngredients,
          directions: this.subDirections
        } : undefined
      }
    }
  }
}
</script>

<style>
/* .quill-editor {
  height: auto;
  min-height: 100%;
  /* padding: 50px; */
}

.quill-container .ql-editor {
  font-size: 18px;
  overflow-y: visible;
} */

#scrolling-container {
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
}

/* #editor {
  height: 100%;
  min-height: 200px;
  overflow-y: auto;
} */
</style>
