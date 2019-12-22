<template>
  <v-layout>
    <fi-card v-for="(post, index) in posts" :key="index" v-bind="post" />
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import FiCard from '@/components/fi-card/FiCard.vue'

export default Vue.extend({
  name: 'Index',
  components: {
    FiCard
  },
  data: () => ({
    posts: [
      {
        title: 'Post Title',
        subtitle: 'Post Title',
        text: 'Post Text',
        to: { name: 'index' },
        minWidth: '300px',
        type: 'post'
      },
      {
        title: 'Post Title',
        subtitle: 'Post Title',
        text: 'Post Text',
        to: { name: 'index' },
        minWidth: '300px',
        src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        type: 'product'
      },
      {
        title: 'Post Title',
        subtitle: 'Post Title',
        text: 'Post Text',
        to: { name: 'index' },
        minWidth: '300px',
        src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        type: 'advertisement'
      }
    ]
  })
})
</script>
