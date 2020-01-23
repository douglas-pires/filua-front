<template>
  <v-layout>
    <v-flex>
      <v-btn class="primary" :to="{ name: 'institutions-register' }">
        REGISTER
      </v-btn>
      <v-flex d-flex row>
        <fi-card
          v-for="(institution, index) in institutions"
          :key="index"
          no-gradient
          :title="institution.name"
          :text="institution.about"
          :src="institution.image"
        />
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import institutions from '@/apollo/institutions.graphql'
import FiCard from '@/components/fi-card/FiCard.vue'

export default Vue.extend({
  name: 'Institutions',
  components: { FiCard },
  data() {
    return {
      institutions: []
    }
  },
  async mounted() {
    try {
      const { data } = await this.$apollo.query({
        query: institutions,
        fetchPolicy: 'no-cache'
      })
      this.institutions = data.institutions
    } catch (error) {}
  }
})
</script>
