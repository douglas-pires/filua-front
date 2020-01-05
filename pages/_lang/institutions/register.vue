<template>
  <v-layout>
    <v-flex>
      <h2 class="primary--text mb-5">
        {{ registerTitle }}
      </h2>
      <v-text-field
        v-model="institution.name"
        :rules="[rules.required]"
        :error-messages="errors.isDuplicate"
        outlined
        :label="nameText"
        @blur="searchInstitutionByName"
      />
      <v-textarea
        v-model="institution.about"
        :rules="[rules.required]"
        outlined
        :label="aboutText"
      />
      <v-text-field
        v-model="institution.website"
        outlined
        :label="websiteText"
      />
      <v-flex d-flex>
        <h2 class="primary--text">
          {{ bankInfoText }}
        </h2>
        <v-spacer />
        <v-btn class="primary" @click="addAccount">
          {{ addAccountText }}
        </v-btn>
      </v-flex>
      <v-card
        v-for="(bank, index) in institution.accounts"
        :key="index"
        class="mt-5 mb-5"
      >
        <v-card-actions v-if="institution.accounts.length > 1">
          <v-spacer />
          <v-icon @click="removeAccount(index)">
            mdi-close
          </v-icon>
        </v-card-actions>
        <v-card-title>
          {{ bank.bankName }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="bank.bankName"
            :rules="[rules.required]"
            outlined
            :label="bankNameText"
          />
          <v-text-field
            v-model="bank.agency"
            :rules="[rules.required]"
            outlined
            :label="agencyText"
          />
          <v-text-field
            v-model="bank.account"
            :rules="[rules.required]"
            outlined
            :label="accountText"
          />
        </v-card-text>
      </v-card>
      <v-btn
        :disabled="disableRegister || hasErrorMessages"
        class="primary"
        @click="addInstitution"
      >
        {{ addInstitutionText }}
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import rules from '@/helpers/validations'
import addInstitution from '@/apollo/add-institution.graphql'
import getInstitution from '@/apollo/get-institution.graphql'
import * as types from '@/store/snackbar/types'

export default Vue.extend({
  name: 'Register',
  data() {
    return {
      rules: {
        ...rules
      },
      registerTitle: this.$t('REGISTER_INSTITUTION.registerTitle'),
      nameText: this.$t('REGISTER_INSTITUTION.nameText'),
      aboutText: this.$t('REGISTER_INSTITUTION.aboutText'),
      websiteText: this.$t('REGISTER_INSTITUTION.websiteText'),
      bankInfoText: this.$t('REGISTER_INSTITUTION.bankInfoText'),
      bankNameText: this.$t('REGISTER_INSTITUTION.bankNameText'),
      agencyText: this.$t('REGISTER_INSTITUTION.agencyText'),
      accountText: this.$t('REGISTER_INSTITUTION.accountText'),
      addAccountText: this.$t('REGISTER_INSTITUTION.addAccountText'),
      addInstitutionText: this.$t('REGISTER_INSTITUTION.addInstitutionText'),
      errors: {
        isDuplicate: ''
      },
      institution: {
        name: '',
        about: '',
        website: '',
        accounts: [{ bankName: '', agency: '', account: '' }]
      }
    }
  },
  computed: {
    disableRegister(): boolean {
      return !(
        this.institution.name &&
        this.institution.about &&
        this.institution.accounts.filter(
          (item) => item.agency && item.account && item.bankName
        ).length
      )
    },
    hasErrorMessages(): boolean {
      return Boolean(Object.values(this.errors).filter(Boolean).length)
    }
  },
  methods: {
    ...mapMutations(types.NAMESPACE, {
      mutSetSnackbarMessage: types.MUT_SET_SNACKBAR_MESSAGE
    }),
    addAccount() {
      this.institution.accounts.push({ bankName: '', agency: '', account: '' })
    },
    removeAccount(index: number) {
      this.institution.accounts.splice(index, 1)
    },
    async searchInstitutionByName() {
      const { data } = await this.$apollo.query({
        query: getInstitution,
        variables: { name: this.institution.name }
      })

      if (data.getInstitution) {
        return (this.errors.isDuplicate =
          'This institution already exists into database')
      }

      return (this.errors.isDuplicate = '')
    },
    async addInstitution() {
      try {
        await this.$apollo.mutate({
          mutation: addInstitution,
          variables: { input: this.institution }
        })
        this.mutSetSnackbarMessage('Institution successfully registered')
        this.$router.push({ name: 'institutions' })
      } catch (error) {
        this.mutSetSnackbarMessage(
          'An error has ocurred. Please, try again later'
        )
      }
    }
  }
})
</script>
