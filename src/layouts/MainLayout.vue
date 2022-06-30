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
            {{ title }}
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
    </q-page-container>
  </q-layout>
</template>
<!-- {{ title this.$route.path}} -->

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import mixinOtherUserDetails from '../mixins/mixin-other-user-details'

export default defineComponent({
  mixins: [mixinOtherUserDetails],
  computed: {
    ...mapState('moduleStore', ['userDetails', 'users']),
    title() {
      let currentPath = this.$route.fullPath
      console.log(currentPath)
      if(currentPath == '/') return 'QuasarChat'
      else if (currentPath.includes('/chat')) return this.otherUserDetails.name
      else if (currentPath == '/auth') return 'Login'
      return console.log(this.$route.fullPath)
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