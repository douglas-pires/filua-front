import Vue from 'vue'
import { ApolloClient } from 'apollo-client'


declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $apollo: ApolloClient<any>
  }
}
