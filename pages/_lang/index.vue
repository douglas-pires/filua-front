<template>
  <v-layout>
    <client-only>
      <div class="products__wrapper">
        <fi-card
          v-for="(post, index) in products"
          :key="index"
          class="products__item"
          v-bind="post"
        />
      </div>
    </client-only>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import FiCard from '@/components/fi-card/FiCard.vue'
import products from '@/apollo/products.graphql'

const createProductObject = (products: any[]): any[] =>
  products.map((product: any) => ({
    id: product.id,
    title: product.name,
    subtitle: product.partner,
    text: product.name,
    src: product.image,
    to: product.partnerUrl,
    partner: product.partner
  }))

export default Vue.extend({
  name: 'Index',
  components: {
    FiCard
  },
  async serverPrefetch() {
    const { data } = await this.$apollo.query({
      query: products,
      variables: { first: 24, after: null }
    })
    this.$data.products = createProductObject(data.products)
  },
  data: () => ({
    products: [] as any[]
  }),
  async mounted() {
    await this.handleProducts()
    window.addEventListener('scroll', this.initInfiniteScrolling)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.initInfiniteScrolling)
  },
  methods: {
    async handleProducts(
      { first, after }: { first: Number; after: String | null } = {
        first: 24,
        after: null
      }
    ) {
      const { data } = await this.$apollo.query({
        query: products,
        variables: { first, after }
      })

      this.products = this.products.concat(createProductObject(data.products))
    },
    initInfiniteScrolling() {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight
      if (bottomOfWindow) {
        const lastProduct = this.products.pop()
        this.handleProducts({ first: 24, after: lastProduct.id })
      }
    }
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
    @media #{map-get($display-breakpoints, 'xl-only')} {
      columns: 8;
    }
  }
  &__item {
    break-inside: avoid;
  }
}
</style>
