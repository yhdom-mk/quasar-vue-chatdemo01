export default {
  computed: {
    otherUserDetails() {
      if(this.users) {
        // let findUserId = this.$store.state.moduleStore.users.find(el =>
        let findUserId = this.users.find(el =>
          el.userId == this.$route.params.otherUserId)
        console.log(findUserId.userDetails.name);
        return findUserId.userDetails
        // return this.$store.state.moduleStore.users[this.$route.params.otherUserId]
        // console.log(this.$store.state.moduleStore.users);
      }
      return {}
    }
  }
}