<template>
  <v-card>
    <v-card-title>
      <span class="primary--text lobster">{{ login }}</span>
    </v-card-title>
    <v-card-text>
      <v-flex>
        <v-text-field outlined :label="labels.email" required />
        <v-text-field
          outlined
          :label="labels.password"
          type="password"
          required
        />
      </v-flex>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="blue darken-1" text @click="dialog = false">
        {{ cancel }}
      </v-btn>
      <v-btn color="blue darken-1" text @click="dialog = false">
        {{ login }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FiLoginForm',
  data() {
    return {
      cancel: this.$t('LOGIN_FORM.cancel'),
      login: this.$t('LOGIN_FORM.login'),
      labels: {
        email: this.$t('LOGIN_FORM.labels.email'),
        password: this.$t('LOGIN_FORM.labels.password')
      }
    }
  }
})
</script>
