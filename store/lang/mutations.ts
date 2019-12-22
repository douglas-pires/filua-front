import { MutationTree } from 'vuex/types/index'
import { LangState } from './state'
import * as types from './types'

export default {
  [types.SET_LANG](state, locale: string) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
} as MutationTree<LangState>
