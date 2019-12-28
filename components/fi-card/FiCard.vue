<template>
  <v-card
    class="pa-2 ma-2"
    target="_blank"
    :href="to"
    :min-width="minWidth"
    :max-width="maxWidth"
    height="fit-content"
  >
    <v-img v-if="src" :src="src" class="white--text align-end">
      <v-card-title>{{ title }}</v-card-title>
    </v-img>
    <v-card-title v-if="!src" class="primary--text">
      {{ title }}
    </v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-text>{{ text }}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FiCard',
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    text: { type: String, required: true },
    src: { type: String, default: '' },
    minWidth: { type: String, default: '200' },
    maxWidth: { type: String, default: '200' },
    to: { type: [String, Object], default: () => {} }
  }
})
</script>
