import { MutationTree } from 'vuex/types/index'
import * as types from './types'
import { SnackbarState } from './state'

export default {
  [types.MUT_SET_SNACKBAR_MESSAGE](state, snackbarText) {
    state[types.STATE_SHOW_SNACKBAR] = true
    state[types.STATE_SNACKBAR_MESSAGE] = snackbarText
  },
  [types.MUT_HIDE_SNACKBAR](state) {
    state[types.STATE_SHOW_SNACKBAR] = false
  }
} as MutationTree<SnackbarState>
