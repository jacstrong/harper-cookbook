<template>
  <v-container>
    <h1>Create New Account</h1>
    <v-form @submit.prevent="createAccount">
      <v-text-field
        v-model="name"
        label="Name"
        required
        variant="outlined"
        counter="40"
      />
      <v-text-field
        v-model="relationship"
        label="Relationship to Harper Family"
        required
        variant="outlined"
        counter="240"
      />
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        required
        variant="outlined"
      />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
        variant="outlined"
      />
      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        required
        variant="outlined"
      />
      <v-btn type="submit" color="primary">Create Account</v-btn>
      <v-btn class="ml-4" variant="text">Already have an account? Login</v-btn>
    </v-form>
    <p class="mt-4">
      Please note: All accounts must be approved before they can be used. If you do not receive approval within 24 hours, contact us at <a href="mailto:support@harpercookbook.com">support@harpercookbook.com</a>.
    </p>

  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const name = ref('');
const relationship = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const createAccount = () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }
  // Call API to create account
}
</script>
