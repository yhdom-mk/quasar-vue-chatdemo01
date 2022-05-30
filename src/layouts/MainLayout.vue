<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="glossy">

        <q-btn 
          v-if="$route.fullPath.includes('/chat')"
          @click="$router.go(-1)"
          icon="arrow_back"
          flat
          dense
          label="Back" />

        <q-toolbar-title class="absolute-center">
          {{ $route.path }}
        </q-toolbar-title>

        <q-btn
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      {{ title }}
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { openURL } from 'quasar'

export default defineComponent({
  computed: {
    title() {
      return console.log(this.$route)
      let currentPath = this.$route.fullPath
      if(currentPath == '/') return 'QuasarChat'
      else if (currentPath == '/chat') return 'Chat'
      else if (currentPath == '/auth') return 'Login'
      console.log(currentPath)
    }
  },
  methods: {
    openURL,
  }
})
</script>
