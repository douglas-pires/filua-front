<template>
  <v-layout>
    <v-flex d-flex>
      <v-flex>
        <v-flex>
          <v-text-field :label="labels.name" outlined />
          <v-text-field :label="labels.email" outlined />
          <v-text-field :label="labels.phone" outlined />
        </v-flex>
        <v-flex>
          <h3>{{ interestsTitle }}</h3>
          <v-flex d-flex>
            <v-checkbox
              v-for="(interest, index) in interests"
              :key="index"
              :label="interest"
              class="pa-2"
            />
          </v-flex>
        </v-flex>
        <v-btn color="primary">
          {{ saveButton }}
        </v-btn>
      </v-flex>
      <v-spacer />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Settings',
  data() {
    return {
      labels: {
        name: this.$t('SETTINGS.labels.name'),
        email: this.$t('SETTINGS.labels.email'),
        phone: this.$t('SETTINGS.labels.phone')
      },
      interestsTitle: this.$t('SETTINGS.interests'),
      interests: ['Games', 'Tech', 'Books'],
      saveButton: this.$t('SETTINGS.saveButton')
    }
  }
})
</script>
