// import Vue from 'vue'
import { firebaseAuth, firebaseDb } from "../boot/firebase"

let messagesRef

const state = {
  userDetails: {},
  users: [],
  messages: []
  
  // usersPayloads: {
  //   name: '',
  //   email: '',
  //   online: true,
  //   userId: null
  // },
}

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload
  },
  addUser(state, payload) {
    // Vue.set(state.users, payload.userId, payload.userDetails)
    // state.users.userDetails = payload.userDetails
    // state.users = payload.userDetails
    // state.users.userId = payload.userDetails

    // state.users.push(...[payload.userDetails])
    // state.users.push(...[payload.userId])
    // state.users.push(...[JSON.parse(JSON.stringify(payload))])

    state.users.push(...[payload])   //payload ===> userId, userDetails
    console.log(state.users);
    // console.log('payload', payload);
  },
  updateUser(state, payload) {
    // Object.assign(state.users[userId],payload.userDetails)
    // Object.assign(state.users, payload.userDetails)
    // console.log(payload.userDetails);

    let filUsers = state.users.filter(el => {
      return el.userId !== payload.userId
    })
    // console.log(filUsers);
    state.users = filUsers

    let proxy_userDetails = new Proxy(payload, {
      set(target,prop,value) {
        target[prop] = value
        return true
      }
    })
    // console.log(proxy_userDetails);

    let updateUsers = state.users.push(proxy_userDetails)
    // console.log(updateUsers);
    state.uses = updateUsers

    // let payloadIndex = state.users.some( el => {
    //   return el.userId == payload.userId 
    // })
    // console.log(payloadIndex);
    // console.log(state.users);
  },
  addMessage(state, payload) {
    state.messages.push(...[payload])   //payload ===> messageId, messageDetails
    console.log(state.messages);
  },
  clearMessages(state) {
    state.messages = []
  }
}

const actions = {
  registerUser({}, payload) {
    console.log('payload:', payload);
    firebaseAuth.createUserWithEmailAndPassword(
      payload.email,
      payload.password)
    .then(response => {
      console.log(response)

      let userId = firebaseAuth.currentUser.uid
      firebaseDb.ref('users/' + userId).set({
        name: payload.name,
        email: payload.email,
        online: true
      })
    })
    .catch(error => {
      console.log(error.message);
    })
  },
  loginUser({}, payload) {
    firebaseAuth.signInWithEmailAndPassword(
      payload.email,
      payload.password)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error.message);
    })
  },
  logoutUser() {
    firebaseAuth.signOut()
  },
  handleAuthStateChanged({ commit, dispatch, state }){
    console.log('handle login');
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is logged in.
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).once('value', snapshot => {
          console.log('snapshot:', snapshot)
          let userDetails = snapshot.val()
          console.log('userDetails:', userDetails);
          commit('setUserDetails', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          })
        })
        dispatch('firebaseUpdateUser', {
          userId: userId,
          updates: {
            online: true
          }
        })
        dispatch('firebaseGetUsers')
        this.$router.push('/')
      }
      else {
        //User is logged out.
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        commit('setUserDetails', {})
        this.$router.replace('/auth')
      }
    });
  },
  firebaseUpdateUser({}, payload) {
    firebaseDb.ref('users/' + payload.userId)
      .update(payload.updates)
    console.log('updateUserPayload', payload);
  },
  firebaseGetUsers({ commit }) {
    firebaseDb.ref('users').on('child_added', snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      // console.log(snapshot.key);
      // console.log(userDetails, userId);
      commit('addUser', {
        userDetails,
        userId
      })
    })
    firebaseDb.ref('users').on('child_changed', snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      // console.log(userDetails, userId);
      commit('updateUser', {
        userDetails,
        userId
      })
    })
  },
  firebaseGetMessages({ commit, state }, otherUserId) {
    console.log('otherUserId:', otherUserId);
    let userId = state.userDetails.userId
    console.log(userId);
    messagesRef = firebaseDb.ref('chats/'+ userId +'/'+ otherUserId)
    messagesRef.on('child_added', snapshot => {
      // console.log('snapshot:', snapshot)
      let messageDetails = snapshot.val()
      let messageId = snapshot.key
      // console.log('messageId:', messageId);
      // console.log('messageDetails:', messageDetails);
      commit('addMessage', {
        messageId,
        messageDetails
      })
    })
  },
  firebaseStopGettingMessages({ commit }) {
    if(messagesRef) {
      messagesRef.off('child_added')
      commit('clearMessages')
      // console.log('firebaseStopGettingMessages');
    }
  },
  firebaseSendMessage({}, payload) {
    console.log('sendMessagePayload', payload);
    firebaseDb.ref('chats/'+ state.userDetails.userId
     +'/'+ payload.otherUserId).push(payload.message)

    payload.message.from = 'them'
    firebaseDb.ref('chats/'+ payload.otherUserId
     +'/'+ state.userDetails.userId).push(payload.message)
  }
}

const getters = {
  users: state => {
    let usersFiltered = {}
    usersFiltered = state.users.filter((id) =>
      id.userId !== state.userDetails.userId)
    console.log(usersFiltered);
    return usersFiltered
    // Object.keys(state.users).forEach(key => {
    //   if(key !== state.users.userId) {
    //     usersFiltered[key] = state.users[key]
    //   }
    // });
    // console.log(Object.keys(state.users));
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}