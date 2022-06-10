// import Vue from 'vue'
import { firebaseAuth, firebaseDb } from "../boot/firebase"

const state = {
  userDetails: {},
  users: {}
}
const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload
  },
  addUser(state, payload) {
    // console.log('payload', payload);
    // Vue.set(state.users, payload.userId, payload.userDetails)
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
      commit('addUser', {
        userDetails,
        userId
      })
    })
  }
}
const getters = {
  users: state => {
    return state.users
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}