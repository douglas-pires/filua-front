<template>
  <v-layout>
    <no-ssr>
      <div class="products__wrapper">
        <fi-card
          v-for="(post, index) in products"
          :key="index"
          class="products__item"
          v-bind="post"
        />
      </div>
    </no-ssr>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import FiCard from '@/components/fi-card/FiCard.vue'
import products from '@/apollo/products.graphql'

export default Vue.extend({
  name: 'Index',
  components: {
    FiCard
  },
  async serverPrefetch() {
    const { data } = await this.$apollo.query({
      query: products
    })

    this.$data.products = data.products.map((product: any) => ({
      title: product.name,
      subtitle: product.partner,
      text: product.name,
      src: product.image,
      to: product.partnerUrl,
      partner: product.partner
    }))
  },
  data: () => ({
    products: [
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
  }),
  async mounted() {
    const { data } = await this.$apollo.query({
      query: products
    })

    this.products = data.products.map((product: any) => ({
      title: product.name,
      subtitle: product.partner,
      text: product.name,
      src: product.image,
      to: product.partnerUrl,
      partner: product.partner
    }))
  }
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';

.products {
  &__wrapper {
    margin: 20px auto;
    width: 100%;
    columns: 2;
    column-gap: 20px;
    @media #{map-get($display-breakpoints, 'sm-and-up')} {
      columns: 3;
    }
    @media #{map-get($display-breakpoints, 'md-and-up')} {
      columns: 4;
    }
    @media #{map-get($display-breakpoints, 'lg-and-up')} {
      columns: 5;
    }
  }
  &__item {
    break-inside: avoid;
  }
}
</style>
