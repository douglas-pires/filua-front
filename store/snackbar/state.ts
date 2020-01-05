import * as types from './types'

export interface SnackbarState {
  [types.STATE_SNACKBAR_MESSAGE]: string
  [types.STATE_SHOW_SNACKBAR]: boolean
}

export default () => ({
  [types.STATE_SNACKBAR_MESSAGE]: '',
  [types.STATE_SHOW_SNACKBAR]: false
})
