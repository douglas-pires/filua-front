<template>
  <v-snackbar v-model="show">
    {{ message }}
    <v-btn text @click="show = false">
      {{ close }}
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import * as types from '@/store/snackbar/types'

export default Vue.extend({
  name: 'FiSnackbar',
  data() {
    return {
      close: 'Close'
    }
  },
  computed: {
    ...mapState(types.NAMESPACE, {
      message: types.STATE_SNACKBAR_MESSAGE,
      show: types.STATE_SHOW_SNACKBAR
    }),
    show: {
      get() {
        return this.$store.state.snackbar[types.STATE_SHOW_SNACKBAR]
      },
      set() {
        this.mutHideSnackbar()
      }
    }
  },
  methods: {
    ...mapMutations(types.NAMESPACE, {
      mutHideSnackbar: types.MUT_HIDE_SNACKBAR
    })
  }
})
</script>
