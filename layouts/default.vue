<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="primary">
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="primary--text" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        class="primary--text"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>
        <span class="lobster primary--text">Filua</span>
      </v-toolbar-title>

      <v-spacer />
      <v-btn
        depressed
        class="mr-2 secondary primary--text"
        @click="loginDialog = !loginDialog"
      >
        {{ login }}
      </v-btn>
      <v-btn color="primary" @click="registerDialog = !registerDialog">
        {{ register }}
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-dialog v-model="loginDialog" min-width="fit-content" max-width="300px">
        <fi-login-form />
      </v-dialog>
      <v-dialog
        v-model="registerDialog"
        min-width="fit-content"
        max-width="300px"
      >
        <fi-register-form />
      </v-dialog>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <fi-snackbar />
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import FiLoginForm from '@/components/fi-login-form/FiLoginForm.vue'
import FiRegisterForm from '@/components/fi-register-form/FiRegisterForm.vue'
import FiSnackbar from '@/components/fi-snackbar/FiSnackbar.vue'

export default Vue.extend({
  components: {
    FiLoginForm,
    FiRegisterForm,
    FiSnackbar
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: this.$t('MENU_DRAWER.products'),
          to: { name: this.$t('LINKS.home') }
        },
        {
          icon: 'mdi-chart-bubble',
          title: this.$t('MENU_DRAWER.about'),
          to: { name: this.$t('LINKS.about') }
        },
        {
          icon: 'mdi-chart-bubble',
          title: this.$t('MENU_DRAWER.settings'),
          to: { name: this.$t('LINKS.settings') }
        }
      ],
      title: 'Filua',
      login: this.$t('NAVBAR.login'),
      register: this.$t('NAVBAR.register'),
      loginDialog: false,
      registerDialog: false
    }
  }
})
</script>
