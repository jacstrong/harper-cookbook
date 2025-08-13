<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
    >
      <!-- style="height: calc(100vh - 64px - 56px);" -->
      <!-- Assuming app bar height is 64px and footer height is 56px -->
      <v-col cols="12" sm="8" md="6" lg="4" xl="3">
        <v-card variant="flat">
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                type="email"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                required
                variant="outlined"
              ></v-text-field>
              <v-btn block color="primary">Login</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary">Create an Account</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary">Forgot Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
