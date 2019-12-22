<template>
  <v-flex>
    <h1 class="montserrat primary--text">
      {{ title }}
    </h1>
    <p>{{ text }}</p>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'About',
  data() {
    return {
      title: this.$t('ABOUT.title'),
      text: this.$t('ABOUT.text')
    }
  }
})
</script>
