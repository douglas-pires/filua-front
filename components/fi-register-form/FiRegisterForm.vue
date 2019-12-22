<template>
  <v-card>
    <v-card-title>
      <span class="primary--text lobster">{{ register }}</span>
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
        <v-text-field
          outlined
          :label="labels.confirmPassword"
          type="password"
          required
        />
      </v-flex>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="dialog = false">
        {{ cancel }}
      </v-btn>
      <v-btn text @click="dialog = false">
        {{ register }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FiRegisterForm',
  data() {
    return {
      labels: {
        email: this.$t('REGISTER_FORM.labels.email'),
        password: this.$t('REGISTER_FORM.labels.password'),
        confirmPassword: this.$t('REGISTER_FORM.labels.confirmPassword')
      },
      register: this.$t('REGISTER_FORM.register'),
      cancel: this.$t('REGISTER_FORM.cancel')
    }
  }
})
</script>
