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
          <div class="omit">
            {{ this.$route.path }}
          </div>
        </q-toolbar-title>

        <q-btn
          v-if="!userDetails.userId"
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login" />
        <q-btn
          v-else
          @click="logoutUser"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense>
          Logout<br>
          {{ userDetails.name }}
        </q-btn>
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
import { mapState, mapActions } from 'vuex'

export default defineComponent({
  computed: {
    ...mapState('moduleStore', ['userDetails']),
    title() {
      return console.log(this.$route.fullPath)
        let currentPath = this.$route.fullPath
        if(currentPath == '/') return 'QuasarChat'
        else if (currentPath == '/chat') return 'Chat'
        else if (currentPath == '/auth') return 'Login'
        console.log(currentPath)
    }
  },
  methods: {
    ...mapActions('moduleStore', ['logoutUser'])
  }
})
</script>

<style lang="stylus">
  .q-toolbar
    .q-btn
      line-height: 1.2
</style>