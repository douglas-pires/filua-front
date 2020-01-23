<template>
  <v-form ref="form">
    <v-card>
      <v-card-title>
        <span class="primary--text lobster">{{ loginText }}</span>
      </v-card-title>
      <v-card-text>
        <v-flex>
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            outlined
            :label="labels.email"
            required
          />
          <v-text-field
            v-model="password"
            :rules="[rules.required]"
            outlined
            :label="labels.password"
            type="password"
            required
          />
        </v-flex>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="$emit('close')">
          {{ cancel }}
        </v-btn>
        <v-btn :disabled="isValid" color="primary" text @click="login">
          {{ loginText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import rules from '@/helpers/validations'
import loginQuery from '@/apollo/login.graphql'

import * as types from '@/store/snackbar/types'

export default Vue.extend({
  name: 'FiLoginForm',
  data() {
    return {
      rules,
      loading: false,
      cancel: this.$t('LOGIN_FORM.cancel'),
      loginText: this.$t('LOGIN_FORM.login'),
      labels: {
        email: this.$t('LOGIN_FORM.labels.email'),
        password: this.$t('LOGIN_FORM.labels.password')
      },
      email: null,
      password: null
    }
  },
  computed: {
    isValid(): boolean {
      return !this.email || !this.password
    }
  },
  methods: {
    ...mapMutations(types.NAMESPACE, {
      mutSetSnackbarMessage: types.MUT_SET_SNACKBAR_MESSAGE
    }),
    async login() {
      this.loading = true
      if (!(this as any).$refs.form.validate()) return

      try {
        const { data } = await this.$apollo.query({
          query: loginQuery,
          variables: { input: { email: this.email, password: this.password } },
          fetchPolicy: 'no-cache'
        })
        this.mutSetSnackbarMessage(`Welcome back, ${data.login.name}!`)
        this.$emit('close')
        localStorage.setItem(process.env.TOKEN_ID!, data.login.token)
        localStorage.setItem(
          process.env.REFRESH_TOKEN_ID!,
          data.login.refreshToken
        )
      } catch (error) {
        const err = JSON.parse(JSON.stringify(error))
        this.mutSetSnackbarMessage(err.message.replace('GraphQL error: ', ''))
      }
      this.loading = false
    }
  }
})
</script>
