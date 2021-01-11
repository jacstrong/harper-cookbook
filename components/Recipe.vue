<template>
  <v-container v-if="recipe">

    <v-row>
      <v-col>
        <span class="display-1">{{recipe.name}}</span><span class="headline"> - {{recipe.by}}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="headline">
        Ingredients
      </v-col>
    </v-row>
    <v-row v-for="(ingredient, i) in recipe.ingredients" :key="ingredient._id">
      <v-col cols="1">
        <v-icon
          v-if="ingredient.done"
          large
          :color="i % 2 === 0 ? `primary` : `accent`"
          light
          @click="ingredientStateChange(i, false)"
        >
          mdi-checkbox-marked-outline
        </v-icon>
        <v-icon
          v-else
          large
          :color="i % 2 === 0 ? `primary` : `accent`"
          light
          @click="ingredientStateChange(i, true)"
        >
          mdi-numeric-{{i + 1}}-box-outline
        </v-icon>
      </v-col>
      <v-col cols="11" class="body-1">
        {{ingredient.amount}} {{ingredient.type}} - {{ingredient.ingredient}}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="headline">
        Directions
      </v-col>
    </v-row>
    <v-row
      v-for="(direction, i) in recipe.directions"
      :key="direction._id"
    >
      <v-col cols="1">
        <v-icon
          v-if="direction.done"
          large
          :color="i % 2 === 0 ? `primary` : `accent`"
          light
          @click="directionStateChange(i, false)"
        >
          <!-- class="mr-3" -->
          mdi-checkbox-marked-circle-outline
        </v-icon>
        <v-icon
          v-else
          large
          :color="i % 2 === 0 ? `primary` : `accent`"
          light
          @click="directionStateChange(i, true)"
        >
          <!-- class="mr-3" -->
          mdi-numeric-{{i + 1}}-circle
        </v-icon>
      </v-col>
      <v-col cols="11" class="body-1">
        {{direction.text}}
      </v-col>
    </v-row>


    <div v-if="recipe.subRecipe && recipe.subRecipe.directions.length > 0" class="mt-5">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col>
              <span class="display-1">{{recipe.subRecipe.name}}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="headline">
              Ingredients
            </v-col>
          </v-row>
          <v-row v-for="(ingredient, i) in recipe.subRecipe.ingredients" :key="ingredient._id">
            <v-col cols="1">
              <v-icon
                v-if="ingredient.done"
                large
                :color="i % 2 === 0 ? `primary` : `accent`"
                light
                @click="subIngredientStateChange(i, false)"
              >
                mdi-checkbox-marked-outline
              </v-icon>
              <v-icon
                v-else
                large
                :color="i % 2 === 0 ? `primary` : `accent`"
                light
                @click="subIngredientStateChange(i, true)"
              >
                mdi-numeric-{{i + 1}}-box-outline
              </v-icon>
            </v-col>
            <v-col cols="11" class="body-1">
              {{ingredient.amount}} {{ingredient.type}} - {{ingredient.ingredient}}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="headline">
              Directions
            </v-col>
          </v-row>
          <v-row
            v-for="(direction, i) in recipe.subRecipe.directions"
            :key="direction._id"
          >
            <v-col cols="1">
              <v-icon
                v-if="direction.done"
                large
                :color="i % 2 === 0 ? `primary` : `accent`"
                light
                @click="subDirectionStateChange(i, false)"
              >
                <!-- class="mr-3" -->
                mdi-checkbox-marked-circle-outline
              </v-icon>
              <v-icon
                v-else
                large
                :color="i % 2 === 0 ? `primary` : `accent`"
                light
                @click="subDirectionStateChange(i, true)"
              >
                <!-- class="mr-3" -->
                mdi-numeric-{{i + 1}}-circle
              </v-icon>
            </v-col>
            <v-col cols="11" class="body-1">
              {{direction.text}}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
    <v-row v-if="recipe.notes">
      <v-col class="headline">
        Notes
      </v-col>
    </v-row>
    <v-row v-if="recipe.notes">
      <v-col>
        <div v-html="recipe.notes" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'recipe',
  props: [
    'recipe'
  ],
  methods: {
    directionStateChange(i, next) {
      let direction = {...this.recipe.directions[i]}
      direction.done = next
      this.$set(this.recipe.directions, i, direction)
    },
    subDirectionStateChange(i, next) {
      let direction = {...this.recipe.subRecipe.directions[i]}
      direction.done = next
      this.$set(this.recipe.subRecipe.directions, i, direction)
    },
    ingredientStateChange(i, next) {
      let ingredient = {...this.recipe.ingredients[i]}
      ingredient.done = next
      this.$set(this.recipe.ingredients, i, ingredient)
    },
    subIngredientStateChange(i, next) {
      let ingredient = {...this.recipe.subRecipe.ingredients[i]}
      ingredient.done = next
      this.$set(this.recipe.subRecipe.ingredients, i, ingredient)
    }
  },
  mounted () {
    console.log(this.recipe)
  }
}
</script>

<style>
.centered-vert {
  vertical-align: middle;
}
</style>
