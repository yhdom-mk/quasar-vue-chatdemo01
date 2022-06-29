export default {
  computed: {
    otherUserDetails() {
      // console.log(this.$store.state.moduleStore.users);
      // let findUserId = this.$store.state.moduleStore.users.find(el =>
      let findUserId = this.users.find(el =>
        el.userId == this.$route.params.otherUserId)
      console.log(findUserId.userDetails.name);
      // return this.$store.state.moduleStore.users[this.$route.params.otherUserId]
      return findUserId.userDetails
    }
  }
}