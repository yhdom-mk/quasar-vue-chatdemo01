<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      v-model="formData.name"
      class="q-mb-md"
      filled
      label="Name" />
    <q-input
      v-model="formData.email"
      class="q-mb-md"
      filled
      type="email"
      label="Email" />
    <q-input
      v-model="formData.password"
      class="q-mb-md"
      filled
      type="password"
      label="Password" />

    <div class="row">
      <q-space />
      <q-btn
        @click="submitForm"
        color="primary"
        type="submit"
        :label="tab" />
    </div>
  </q-form>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  props: ['tab'],
  data(){
    return {
      formData: {
        name: '',
        email: 'nop@test.com',
        password: '123nop'
      }
    }
  },
  methods: {
    ...mapActions('moduleStore' ,['registerUser', 'loginUser']),

    submitForm() {
      if(this.tab == 'login') {
        this.loginUser(this.formData)
      }
      else {
        this.registerUser(this.formData)
      }
    }
  }
})
</script>