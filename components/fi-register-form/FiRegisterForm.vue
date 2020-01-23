<template>
  <v-form ref="form">
    <v-card>
      <v-card-title>
        <span class="primary--text lobster">{{ registerWord }}</span>
      </v-card-title>
      <v-card-text>
        <v-flex>
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            outlined
            :label="labels.name"
            required
          />
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            outlined
            :label="labels.email"
            required
          />
          <v-text-field
            v-model="password"
            outlined
            :label="labels.password"
            :rules="[rules.required]"
            type="password"
            required
          />
          <v-text-field
            v-model="confirmPassword"
            outlined
            :rules="[rules.required, samePassword]"
            :label="labels.confirmPassword"
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
        <v-btn
          :loading="loading"
          :disabled="isValid"
          color="primary"
          text
          @click="register"
        >
          {{ registerWord }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

import rules from '@/helpers/validations'
import registerMuation from '@/apollo/register-user.graphql'
import * as types from '@/store/snackbar/types'

export default Vue.extend({
  name: 'FiRegisterForm',
  data() {
    return {
      rules,
      labels: {
        name: this.$t('REGISTER_FORM.labels.name'),
        email: this.$t('REGISTER_FORM.labels.email'),
        password: this.$t('REGISTER_FORM.labels.password'),
        confirmPassword: this.$t('REGISTER_FORM.labels.confirmPassword')
      },
      registerWord: this.$t('REGISTER_FORM.register'),
      cancel: this.$t('REGISTER_FORM.cancel'),
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      dialog: false,
      loading: false
    }
  },
  computed: {
    isValid(): boolean {
      return (
        !this.name || !this.email || !this.password || !this.confirmPassword
      )
    }
  },
  methods: {
    ...mapMutations(types.NAMESPACE, {
      mutSetSnackbarMessage: types.MUT_SET_SNACKBAR_MESSAGE
    }),
    samePassword() {
      return (
        this.password === this.confirmPassword || 'The passwords must match'
      )
    },
    async register() {
      if (!(this as any).$refs.form.validate()) return
      this.loading = true
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }

      try {
        await this.$apollo.mutate({
          mutation: registerMuation,
          variables: { input: user }
        })
        this.mutSetSnackbarMessage('User registered successfully!')
        this.$emit('close')
      } catch (error) {
        const err = JSON.parse(JSON.stringify(error))
        this.mutSetSnackbarMessage(err.message.replace('GraphQL error: ', ''))
      }
      this.loading = false
    }
  }
})
</script>
