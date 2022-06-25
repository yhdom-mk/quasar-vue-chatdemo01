<template>
  <q-banner inline-actions class="bg-grey-4 text-center">
    User is offline.
  </q-banner>
  <q-page class="flex column">
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.messageDetails.text"
        :name="message.messageDetails.from"
        :text="[message.messageDetails.text]"
        :sent="message.messageDetails.from == 'me' ? true: false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar class="glossy">
        <q-form
          @submit="sendMessage"
          class="full-width">
          <q-input
            v-model="newMessage"
            bg-color="blue-grey-1"
            class="full-width"
            outlined
            rounded
            label="Message"
            dense>

            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                color="blue-grey-2"
                icon="send" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
  data() {
    return {
      newMessage: "",
      // messages: [
      //   {
      //     text: 'Hi!Lizzy, How are you?',
      //     from: 'me'
      //   },
      //   {
      //     text: 'Good Thanks, Jimmy. How are you?',
      //     from: 'them'
      //   },
      //   {
      //     text: 'Pretty Good!',
      //     from: 'me'
      //   }
      // ]
    }
  },
  computed: {
    ...mapState('moduleStore', ['messages'])
  },
  methods: {
    ...mapActions('moduleStore', ['firebaseGetMessages']),
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: 'me'
      })
    }
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.otherUserId)
  }
})
</script>
