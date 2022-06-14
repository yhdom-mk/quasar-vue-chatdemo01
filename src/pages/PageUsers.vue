<template>
  <q-page class="flex q-pa-md">
    <q-list
      class="full-width"
      separator>
      <q-item
        v-for="user in users"
        :key="user.id"
        to="/chat"
        clickable
        v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge
            :color="user.online? 'purple-5' : 'blue-grey-3'">
            {{ user.online? 'Online' : 'Offline' }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  // data () {
    // return {
      // users:
      // [ {
      //   id: 1,
      //   name: 'Jim',
      //   online: true
      // }, {
      //   id: 2,
      //   name: 'Blyan',
      //   online: false
      // }, {
      //   id: 3,
      //   name: 'Lizy',
      //   online: true
      // }, {
      //   id: 4,
      //   name: 'Johnny',
      //   online: true
      // } ]
    // }
  // },
  computed: {
    ...mapGetters('moduleStore', ['users'])
  }
})
</script>
