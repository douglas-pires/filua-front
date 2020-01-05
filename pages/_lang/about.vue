<template>
  <v-flex>
    <h2 class="montserrat primary--text" v-text="whatIsItQuestion" />
    <p v-text="whatIsItAnswer" />
    <nuxt-link to="institutions">
      {{ institutionsList }}
    </nuxt-link>
    <h2 class="montserrat primary--text" v-text="whoAreWeQuestion" />
    <p v-text="whoAreWeAnswer" />
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'About',
  data() {
    return {
      whatIsItQuestion: this.$t('ABOUT.whatIsItQuestion'),
      institutionsList: this.$t('ABOUT.institutionsList'),
      whatIsItAnswer: this.$t('ABOUT.whatIsItAnswer'),
      whoAreWeQuestion: this.$t('ABOUT.whoAreWeQuestion'),
      whoAreWeAnswer: this.$t('ABOUT.whoAreWeAnswer')
    }
  }
})
</script>
