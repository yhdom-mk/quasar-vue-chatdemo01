// import Vue from 'vue'
import { firebaseAuth, firebaseDb } from "../boot/firebase"

const state = {
  userDetails: {},
  users: []
  
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
    // console.log('payload', payload);
    // Vue.set(state.users, payload.userId, payload.userDetails)
    // state.users.userDetails = payload.userDetails
    // state.users = payload.userDetails
    // state.users.userId = payload.userDetails

    // state.users.push(...[payload.userDetails])
    // state.users.push(...[payload.userId])
    state.users.push(...[payload])
    // state.users.push(...[JSON.parse(JSON.stringify(payload))])

    console.log(state.users);
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
  },
  firebaseGetUsers({ commit }) {
    firebaseDb.ref('users').on('child_added', snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      // console.log(userDetails, userId);
      commit('addUser', {
        userDetails,
        userId
      })
    })
  }
}

const getters = {
  users: state => {
    let usersFiltered = {}
    usersFiltered = state.users.filter(
      (id) => id.userId !== state.userDetails.userId)
    // Object.keys(state.users).forEach(key => {
    //   if(key !== state.users.userId) {
    //     usersFiltered[key] = state.users[key]
    //   }
    // });
    // console.log(Object.keys(state.users));
    console.log(usersFiltered);
    return usersFiltered
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}